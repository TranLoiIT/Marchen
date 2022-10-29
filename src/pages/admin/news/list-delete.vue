<template>
     <div>
          <h1 class="px-20 py-5 text-2xl font-bold uppercase">Danh bài viết đã xóa</h1>
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
                              <TdTable :name-table="row.model" :row-width="150" />
                              <TdTable :name-table="row.pirce" :row-width="150" />
                              <TdTable :name-table="row.status" :row-width="150" />
                              <TdTable :id-table="row.id" :row-width="50" :actions="true" :restore="true" @on-click="handlerClick" />
                         </template>
                    </BaseTableVue>
               </div>
          </div>
          <div class="flex justify-center items-center">
               <div class="w-4/5 mt-12">
                    <vs-pagination
                         :total-pages="10"
                         :current-page="currentPage"
                         @change="changePage"
                    />
               </div>
          </div>
     </div>
</template>
<script>
import BaseTableVue from '~/components/BaseTable.vue';
import TdTableVue from '~/components/TdTable.vue';

export default {
     layout: 'admin',
     components: {
          BaseTableVue,
          TdTableVue
     },
     data() {
          return {
               currentPage: 1,
               dataTable : [
                    {
                         id: 1,
                         model: "abcd",
                         pirce: 1200,
                         status: true,
                    },
                    {
                         id: 2,
                         model: "abcd2",
                         pirce: 1300,
                         status: true,
                    }
                    ,
                    {
                         id: 3,
                         model: "abcd3",
                         pirce: 1400,
                         status: true,
                    }
               ]
               
          }
     },
     methods: {
          changePage() {},
          handlerClick(event) {
               if (event.type === 'delete') {
                    this.dataTable = this.dataTable.filter((item) => item.id != event.value);
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
               }
               
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