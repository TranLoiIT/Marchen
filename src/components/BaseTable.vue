<template>
     <div>
          <table class="w-full mb-4">
               <thead>
                    <tr
                         class="text-left surveys_title"
                    >
                         <slot name="columns" />
                    </tr>
               </thead>
               <tbody class="surveys_item">
                    <tr
                         v-for="(item, index) in dataTable"
                         :key="index"
                         class="cursor-pointer"
                    >
                         <TdTable :name-table="`${++index}`" :row-width="20" />
                         <slot :row="item" :index="index" />
                    </tr>
               </tbody>
          </table>
          <div v-if="dataTable.length === 0" class="text-center py-20">
               <p>( Không có dữ liệu )</p>
          </div>
     </div>
</template>
<script>
     import TdTableVue from './TdTable.vue';
 
     export default {
          components: {
               TdTableVue,
          },
          props: {
               dataTable: {
                    type: Array,
               },
          },
     };
</script>
<style lang="scss">
     .surveys_title {
          th {
               background-color: #055DBC !important;
               color: #fff;
               border-style: hidden;
               padding: 15px 12px;
               font-size: 20px;
               text-align: left;
               border-bottom: 1px solid rgb(224, 224, 224)!important;
          }
     }
     .surveys_item {
          color: black;
          tr {
               td {
                    border-top: 0px !important;
                    border-left:0px !important;
                    border-right:0px !important;
                    border-bottom: 2px solid rgb(224, 224, 224)!important;
                    padding: 12px;
                    text-align: left;
                    background-color: #fff;
               }
          }
          tr:last-child {
               td {
                    border-bottom: none !important;
               }
          }
          tr:hover {
               background-color: rgb(237, 237, 237) !important;
          }
     }
     .surveys_item {
          tr:hover {
               td {
                    background-color: rgb(237, 237, 237) !important;
               }
          }
     }
     .bg_table {
         background: #fff;
         color: black;
     }
</style>
 