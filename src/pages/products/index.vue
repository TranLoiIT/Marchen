<template>
     <div class="lg:mt-24 mt-20">
          <div id="list-products" class="mt-5 py-12">
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
                                        @click="changeCategories(item.id)"
                                        class="col-span-1 py-3 flex justify-center cursor-pointer"
                                   >{{ item.name }}</div>
                              </div>
                         </div>
                    </div>
                    <template v-if="products.length > 0">
                         <div class="grid desktop-xs:grid-cols-3 tablet-600:grid-cols-2 grid-cols-1 lg:gap-8 gap-2 lg:mt-20 mt-10">
                              <div
                                   v-for="(item, index) in products"
                                   :key="index"
                                   class="col-span-1 bg-white rounded-15 shadow-xl height--card"
                              >
                                   <img
                                        class="w-full height--image object-cover py-3 px-3"
                                        :src="`${URL}/uploads/${item.img_item}`"
                                        :alt="item.img_item"
                                   >
                                   <div class="lg:px-4 px-2 py-3 relative">
                                        <div
                                             class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate w-full"
                                        >MODEL: {{ item.model }}</div>
                                        <div class="mt-3 lg:text-lg tablet-600:text-sm text-xs text-gray-500 truncate-line__2 lg:h-14 tablet-600:h-10 h-8">
                                             <span v-html="formatText(item.description)"></span>
                                        </div>
                                        <div class="mt-3 tablet-600:flex justify-between items-center">
                                             <div class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate">
                                                  {{ numberFormat(item.price) }} VNĐ
                                             </div>
                                             <div class="mt-3 tablet-600:mt-0">
                                                  <BtnShowMoreVue @on-Click="$router.push(`/products/${item.id}`)" />
                                             </div>
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
import { getItem, getCategories } from '~/api/home';

export default {
     components: {
          LoadingVue,
          BtnShowMoreVue,
     },
     async asyncData({ query }) {
          try {
               const parama = {
                    page: 1,
                    pageSize: 10,
                    order: 'ASC',
                    status: true,
               }
               const { data } = await getCategories(parama);
               const activeCategories = query.categoryId || data.data[0].id;
               return {
                    listCategory: data.data,
                    activeCategories: activeCategories,
               };
          } catch (error) {
               console.log(error);
          }
     },
     layout: 'home',
     mounted() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.getDataProducts();
     },
     computed: {
          search () {
               return this.$route.query?.search || '';
          }
     },
     watch: {
          search () {
               this.getDataProducts()
          }
     },
     data() {
          return {
               listCategory: [],
               pageItem: {
                    currentPage: null,
                    totalCount: null,
                    totalPage: null,
                    page: 1,
                    pageSize: 9,
                    order: 'ASC',
                    status: true,
                    search: ''
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
                    const search = this.$route.query?.search || '';
                    this.loading = true;
                    const parama = {
                         search: search,
                         page: this.pageItem.page,
                         pageSize: this.pageItem.pageSize,
                         order: 'ASC',
                         status: true,
                         categoryId: this.activeCategories,
                    };
                    const {data} = await getItem(parama);
                    if (data) {
                         this.products = data.data;
                         const pagination = data.pagination;
                         this.pageItem = {
                              currentPage: pagination.currentPage,
                              totalCount: pagination.totalCount,
                              totalPage: pagination.totalPage,
                              page: 1,
                              pageSize: 9,
                              order: 'ASC',
                              status: true,
                              search: search,
                         };
                    }
               } catch (error) {
                    console.log(error);
               } finally {
                    setTimeout(() => {
                         this.loading = false;
                    }, 500)
               }
          },
          changeCategories(page) {
               console.log(page);
               this.activeCategories = page;
               this.$router.push({ path: '/products', query: {categoryId: page, search: this.pageItem.search} });
               this.getDataProducts();
          },
          async changePage(value) {
               this.pageItem.page = value;
               await this.getDataProducts();
               window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          formatText(value) {
               const data = value;
               return data.replace(/\n/g, "<br />");
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
          },
     },
}
</script>
<style lang="scss" scoped>
     
</style>