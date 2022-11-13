<template>
     <div>
          <h1 class="px-20 py-5 text-2xl font-bold uppercase">Danh sách sản phẩm đã xóa</h1>
          <div class="flex justify-center items-center mt-6">
               <div class="w-4/5">
                    <BaseTableVue :data-table="dataTable" class="shadow-2xl">
                         <template v-slot:columns>
                              <th style="border-top-left-radius: 15px;">STT</th>
                              <th>Tên model</th>
                              <th>Giá</th>
                              <th>Ngày tạo</th>
                              <th style="border-top-right-radius: 15px;">Chức năng</th>
                         </template>
                         <template slot-scope="{row}">
                              <TdTable :name-table="row.model" :row-width="150" />
                              <TdTable :name-table="row.price" :row-width="100" />
                              <TdTable :name-table="formatDay(row.createdAt)" :row-width="100" />
                              <TdTable :id-table="row.id" :row-width="150" :actions="true" :restore="true" @on-click="handlerClick" />
                         </template>
                    </BaseTableVue>
               </div>
          </div>
          <div v-if="pagination.totalPage > 1" class="flex justify-center items-center">
               <div class="w-4/5 mt-12">
                    <vs-pagination
                         :total-pages="pagination.totalPage"
                         :current-page="pagination.currentPage"
                         @change="changePage"
                    />
               </div>
          </div>
          <Loading :loading="loading" />
          <BaseComfirm
               :showMemo="showMemo"
               :title="'Bạn có muốn xóa sản phẩm này ko này không ?'"
               @comfirm="removeItem"
               @cancel="showMemo = false"
          />
     </div>
</template>
<script>
import BaseTableVue from '~/components/BaseTable.vue';
import TdTableVue from '~/components/TdTable.vue';
import BaseBtn from '@/components/BaseBtn.vue';
import Loading from '@/components/Loading.vue';
import BaseComfirm from '@/components/admin/BaseComfirm.vue';
import { getItem, deleteItem } from '@/api/item';

export default {
     layout: 'admin',
     components: {
          BaseTableVue,
          TdTableVue,
          BaseBtn,
          Loading,
          BaseComfirm,
     },
     data() {
          return {
               pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    totalPage: 0,
                    totalCount: 0,
                    status: false
               },
               dataTable : [],
               loading: false,
               showMemo: false,
               idItem: null,
          }
     },
     mounted() {
          this.getData();
     },
     methods: {
          async getData() {
               try {
                    this.loading = true;
                    const param = {
                         page: this.pagination.currentPage,
                         pageSize: this.pagination.pageSize,
                         order: 'DESC',
                         status: false,
                    }
                    const { data } = await getItem(param);
                    if (data) {
                         this.dataTable = data.data;
                         this.pagination = data.pagination
                    }
               } catch (error) {
                    console.log(error);
                    if (error.response.data.statusCode === 401) {
                         this.notification('error', error.response.data.message);
                         this.$store.commit('auth/set', null);
                         this.$cookies.set('token', null);
                         this.$router.push('/login');
                    } else {
                         this.notification('error', error.message);
                    }
               } finally {
                    this.loading = false;
               }
          },
          changePage(event) {
               this.pagination.currentPage = event;
               this.getData();
          },
          handlerClick(event) {
               if (event.type === 'delete') {
                    this.showMemo = true;
                    this.idItem = event.value;
               } else if (event.type === 'edit') {
                    this.$router.push(`/admin/product/${event.value}/update`)
               }
          },
          async removeItem() {
               if (this.idItem) {
                    try {
                         this.loading = true;
                         const {data} = await deleteItem(this.idItem);
                         this.dataTable = this.dataTable.filter((item) => item.id !== data.id);
                         this.$toast.success("Xóa sản phẩm thành công! ", {
                              position: "top-right",
                              timeout: 3000,
                              closeOnClick: true,
                              pauseOnFocusLoss: true,
                              pauseOnHover: true,
                              draggable: true,
                              draggablePercent: 0.6,
                              showCloseButtonOnHover: false,
                              hideProgressBar: true,
                              closeButton: "button",
                              icon: true,
                              rtl: false
                         });
                    } catch (error) {
                         console.log('error: ', error);
                         if (error.response.data.statusCode === 401) {
                              this.notification('error', error.response.data.message);
                              this.$store.commit('auth/set', null);
                              this.$cookies.set('token', null);
                              this.$router.push('/login');
                         } else {
                              this.notification('error', error.message);
                         }
                    } finally {
                         this.showMemo = false;
                         this.loading = false;
                         this.idItem = null;
                    }
               }
          },
          formatDay(day) {
               return this.$dayjs(day).format('DD-MM-YYYY');
          },
          notification(status, message) {
               this.$toast[status](message, {
                    position: "top-right",
                    timeout: 3000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
               });
          },
     },
}
</script>
<style lang="scss">
.vs-pagination {
     li {
          a {
               font-size: 18px !important;
               font-weight: 600 !important;
          }
     }
     &--active {
          a {
               background: rgba(190, 190, 190, 0.5) !important;
          }
     }
}
</style>