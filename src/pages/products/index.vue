<template>
     <div class="lg:mt-24 mt-20">
          <div class="mt-5 py-12">
               <div class="container mb-10">
                    <div class="flex justify-center my-5">
                         <div class="w-4/5 flex items-center">
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                              <div
                                   class="lg:text-2xl tablet-600:text-xl text-lg font-bold text-black w-full text-center uppercase"
                              >
                                   Danh sách sản phẩm</div>
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                         </div>
                    </div>
                    <div class="flex justify-center mt-12 mb-5">
                         <div class="text-black lg:mt-5 border-b-2 :border-white lg:w-2/3 w-full tablet-640:text-lg text-xs font-medium">
                              <div class="grid grid-cols-4 gap-2">
                                   <div
                                        v-for="(item, index) in listCategory"
                                        :key="index"
                                        :class="(activeCategories === item.id) ? 'bg-black text-white border__menu' : ''"
                                        @click="activeCategories = item.id"
                                        class="col-span-1 py-3 flex justify-center cursor-pointer"
                                   >{{ item.name }}</div>
                              </div>
                         </div>
                    </div>
                    <template v-if="products.length > 0">
                         <div class="grid desktop-xs:grid-cols-3 grid-cols-2 lg:gap-8 gap-2 lg:mt-20 mt-10">
                              <div
                                   v-for="(item, index) in products"
                                   :key="index"
                                   class="col-span-1 bg-white rounded-15 shadow-2xl height--card"
                              >
                                   <img
                                        class="w-full rounded-t-15 object-cover height--image"
                                        :src="`${URL}/uploads/${item.img_item}`"
                                        :alt="item.img_item"
                                   >
                                   <div class="lg:px-4 px-2 py-3 relative">
                                        <div
                                             class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate w-full"
                                        >MODEL: {{ item.model }}</div>
                                        <div class="mt-3 lg:text-lg tablet-600:text-sm text-xs text-gray-500 truncate-line__2 lg:h-14 tablet-600:h-10 h-8">
                                             {{ item.description }}
                                        </div>
                                        <div class="mt-3 tablet-600:flex justify-between items-center">
                                             <div class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate">
                                                  {{ numberFormat(item.price) }} VNĐ
                                             </div>
                                             <div class="mt-3 tablet-600:mt-0">
                                                  <BtnShowMoreVue @on-Click="hanlderClick(item.id)" />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div v-if="pageItem.totalPage > 1" class="mt-12">
                                   <vs-pagination
                                        :total-pages="pageItem.totalPage"
                                        :current-page="pageItem.currentPage"
                                        @change="changePage"
                                   />
                              </div>
                         </div>
                    </template>
                    <template v-else>
                         <div class="w-full text-center mt-12">
                              ( sản phẩm trống ! )
                         </div>
                    </template>
               </div>
          </div>
          <LoadingVue :loading="loading" />
     </div>
</template>
<script>
import LoadingVue from '~/components/Loading.vue';
import BtnShowMoreVue from '~/components/home/BtnShowMore.vue';
import { getItem } from '~/api/home';


export default {
     components: {
          LoadingVue,
          BtnShowMoreVue,
     },
     layout: 'home',
     mounted() {
          this.getDataProducts();
     },
     data() {
          return {
               listCategory: [
                    {id: '1', name: 'Bếp từ'},
                    {id: '2', name: 'Hút mùi'},
                    {id: '3', name: 'Máy rửa bát'},
                    {id: '4', name: 'Đồ gia dụng'},
               ],
               pageItem: {
                    currentPage: null,
                    totalCount: null,
                    totalPage: null,
                    page: 1,
                    pageSize: 9,
                    order: 'DESC',
               },
               products: [],
               loading: false,
               activeCategories: '1',
               URL: process.env.BROWSER_API_URL,
          }
     },
     methods: {
          async getDataProducts() {
               try {
                    this.loading = true;
                    const {data} = await getItem(this.pageItem);
                    if (data) {
                         this.products = data.data;
                         const pagination = data.pagination;
                         this.pageItem = {
                              currentPage: pagination.currentPage,
                              totalCount: pagination.totalCount,
                              totalPage: pagination.totalPage,
                              page: 1,
                              pageSize: 9,
                              order: 'DESC',
                         };
                    }
               } catch (error) {
                    console.log(error);
               } finally {
                    this.loading = false;
               }
          },
          numberFormat(value) {
               const numbString = value;
               const regex = /\B(?=(\d{3})+(?!\d))/g;
               const res = numbString.replace(regex, ',');
               return res;
          },
          hanlderClick(id) {
               if (id) {
                    this.$router.push(`/products/${id}`);
               }
          }
     },
}
</script>
<style lang="scss" scoped>
     
</style>