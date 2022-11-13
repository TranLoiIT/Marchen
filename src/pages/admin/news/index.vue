<template>
     <div class="mb-12">
          <div class="px-20 py-5 mt-2">
               <h1 class="text-2xl font-bold uppercase">Danh bài viết</h1>
               <div class="flex justify-end items-center w-full">
                    <BaseBtn
                         :placeholder="'Thêm mới'"
                         @on-click="$router.push('news/create')"
                    />
               </div>
          </div>
          <div class="flex justify-center items-center mt-6">
               <div class="w-4/5">
                    <BaseTableVue :data-table="dataTable" class="shadow-2xl">
                         <template v-slot:columns>
                              <th style="border-top-left-radius: 15px;">STT</th>
                              <th>Tên bài viết</th>
                              <th>Tác giả</th>
                              <th>Ngày tạo</th>
                              <th style="border-top-right-radius: 15px;">Chức năng</th>
                         </template>
                         <template slot-scope="{row}">
                              <TdTable :name-table="row.name" :row-width="150" />
                              <TdTable :name-table="row.author" :row-width="150" />
                              <TdTable :name-table="formatDay(row.createdAt)" :row-width="150" />
                              <TdTable :id-table="row.id" :row-width="150" :actions="true" @on-click="handlerClick" />
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
               :title="'Bạn có muốn xóa bài viết này không ?'"
               @comfirm="removePost"
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
import { getPost, deletePost } from '@/api/new';

export default {
     layout: 'admin',
     components: {
          BaseTableVue,
          TdTableVue,
          BaseBtn,
          Loading,
          BaseComfirm,
     },
     middleware: 'authenticated',
     data() {
          return {
               pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    totalPage: 0,
                    totalCount: 0
               },
               dataTable : [],
               loading: false,
               showMemo: false,
               idPost: null,
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
                         status: true,
                    }
                    const { data } = await getPost(param);
                    if (data) {
                         this.dataTable = data.data;
                         this.pagination = data.pagination
                    }
               } catch (error) {
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
                    this.idPost = event.value;
               } else if (event.type === 'edit') {
                    this.$router.push(`/admin/news/${event.value}`)
               }
          },
          async removePost() {
               if (this.idPost) {
                    try {
                         this.loading = true;
                         const {data} = await deletePost(this.idPost);
                         this.dataTable = this.dataTable.filter((item) => item.id !== data.id);
                         this.$toast.success("Xóa thành công! ", {
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
                         this.idPost = null;
                    }
               }
          },
          formatDay(day) {
               return this.$dayjs(day).format('DD-MM-YYYY');
          }
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