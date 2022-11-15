<template>
     <div class="lg:mt-24 mt-20">
          <BannerGroup />
          <div class="mt-5 bg-black py-12">
               <div class="container">
                    <div class="lg:text-3xl tablet-600:text-2xl text-xl font-bold text-white text-center uppercase my-12">
                         Danh sách thể loại</div>
                    <div class="grid lg:grid-cols-4 tablet-600:grid-cols-2 grid-cols-1 gap-8">
                         <div class="col-span-1 relative cursor-pointer card" @click="$router.push('/products')">
                              <img src="~/assets/image/bep-tu.jpg" class="image-cate rounded-15 object-cover" alt="">
                              <div class="absolute bottom-2 right-3">
                                   <div
                                        class="rounded-full tablet-600:py-3 py-2 tablet-600:px-6 px-3 shadow-2xl bg-white text-center cursor-pointer"
                                   >
                                        <div class="text-black text-xl font-bold">Bếp từ</div>
                                        <div class="text-black tablet-600:text-base text-xs card--text font-medium underline">Xem sản phẩm</div>
                                   </div>
                              </div>
                         </div>
                         <div class="col-span-1 relative cursor-pointer card" @click="$router.push('/products')">
                              <img src="~/assets/image/hut-mui.jpg" class="image-cate rounded-15 object-cover" alt="">
                              <div class="absolute bottom-2 right-3">
                                   <div
                                        class="rounded-full tablet-600:py-3 py-2 tablet-600:px-6 px-3 shadow-2xl bg-white text-center cursor-pointer"
                                   >
                                        <div class="text-black text-xl font-bold">Hút mùi</div>
                                        <div class="text-black tablet-600:text-base text-xs card--text font-medium underline">Xem sản phẩm</div>
                                   </div>
                              </div>
                         </div>
                         <div class="col-span-1 relative cursor-pointer card" @click="$router.push('/products')">
                              <img src="~/assets/image/may-rua-bat.png" class="image-cate rounded-15 object-cover" alt="">
                              <div class="absolute bottom-2 right-3">
                                   <div
                                        class="rounded-full tablet-600:py-3 py-2 tablet-600:px-6 px-3 shadow-2xl bg-white text-center cursor-pointer"
                                   >
                                        <div class="text-black text-xl font-bold">Máy rửa bát</div>
                                        <div class="text-black tablet-600:text-base text-xs card--text font-medium underline">Xem sản phẩm</div>
                                   </div>
                              </div>
                         </div>
                         <div class="col-span-1 relative cursor-pointer card" @click="$router.push('/products')">
                              <img src="~/assets/image/do-gia-dung.jpg" class="image-cate rounded-15 object-cover" alt="">
                              <div class="absolute bottom-2 right-3">
                                   <div
                                        class="rounded-full tablet-600:py-3 py-2 tablet-600:px-6 px-3 shadow-2xl bg-white text-center cursor-pointer"
                                   >
                                        <div class="text-black text-xl font-bold">Đồ gia dụng</div>
                                        <div class="text-black tablet-600:text-base text-xs card--text font-medium underline">Xem sản phẩm</div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    <!-- <div class="flex justify-center">
                         <div class="text-white lg:mt-5 border-b-2 :border-white lg:w-2/3 w-full tablet-640:text-lg text-xs font-medium">
                              <div class="grid grid-cols-4 gap-2">
                                   <div
                                        v-for="(item, index) in listCategory"
                                        :key="index"
                                        :class="(activeCategories === item.id) ? 'bg-white text-black border__menu' : ''"
                                        @click="changeCategories(item.id)"
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
                                   class="col-span-1 bg-white rounded-15 shadow-xl height--card"
                              >
                                   <img
                                        class="w-full height--image_post object-cover py-3 px-1"
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
                         <div class="w-full text-center mt-12 text-white">
                              ( sản phẩm trống ! )
                         </div>
                    </template> -->
               </div>
          </div>
          <div class="my-12 container tablet-600:h-420px h-256px">
               <div class="flex justify-center">
                    <div class="relative tablet-600:w-4/5 w-11/12 tablet-600:mt-10">
                         <div class="bg-white w-2/5 rounded-15 shadow-2xl absolute top-0 left-0 z-30 tablet-600:flex hidden">
                              <img class="w-full" src="~/assets/image/logo.png" alt="logo">
                         </div>
                         <div
                              class="bg-black tablet-600:w-3/4 w-full px-12 py-8 rounded-15 shadow-2xl
                              tablet-600:absolute lg:top-16 tablet-600:top-12 tablet-600:right-0 z-10 text-white"
                         >
                              <div class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-center">Thiết bị bếp cao cấp Marchen</div>
                              <div class="mt-6 lg:text-lg tablet-600:text-sm text-xs text-center">
                                   Marchen Việt Nam là công ty phân phối độc quyền các sản phẩm, thiết bị nhà bếp độc quyền của thương hiệu Marchen.
                                   Chúng tôi luôn tự hào là đối tác tin cậy, nơi cung cấp các sản phẩm chính hãng,
                                   giá cả hợp lý của thương hiệu thiết bị bếp cao cấp Marchen.
                              </div>
                              <a href="tel:+084965020318">
                                   <div class="flex justify-end mt-5">
                                        <div
                                             class="rounded-full w-40 tablet-600:py-3 py-2 tablet-600:px-5 px-2 shadow-2xl bg-bgHeaderBule text-center shadow-custom"
                                        >
                                             <p class="text-white tablet-600:text-base text-xs font-medium">Liên hệ</p>
                                        </div>
                                   </div>
                              </a>
                         </div>
                    </div>
               </div>
          </div>
          <div class="tablet-600:my-20 my-10 tablet-600:mx-20 px-15px">
               <div class="lg:mt-20 mt-5">
                    <div class="container flex items-center justify-center mb-10">
                         <div class="w-2/3 flex items-center">
                              <div class="flex items-center w-full">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                              <div class="lg:text-3xl tablet-600:text-2xl text-xl font-bold text-black desktop-xs:w-2/5 lg:w-1/2 tablet-600:w-3/5 text-center uppercase">
                                   Tin Tức</div>
                              <div class="flex items-center w-full">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                         </div>
                    </div>
                    <template v-if="posts.length > 0">
                         <carousel
                              :perPageCustom="[[200, 1], [768, 2], [1024, 3]]"
                              :mouse-drag="true"
                              :autoplay="true"
                              :loop="true"
                              :autoplayTimeout="5000"
                         >
                              <slide v-for="(post, index) in posts" :key="index">
                                   <div class="flex justify-center pt-5">
                                        <div class="w-4/5 pt-5 pb-20">
                                             <div class="shadow-2xl p-3 bg-white rounded-15 z-20">
                                                  <img
                                                       class="w-full height--image_post object-cover"
                                                       :src="`${URL}/uploads/${post.img_url}`"
                                                       :alt="post.img_url"
                                                  >
                                                  <div class="py-5 px-2 text-center">
                                                       <div
                                                            class="tablet-600:px-2 lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate w-full"
                                                       >{{ post.name }}</div>
                                                       <div class="flex justify-center mt-2">
                                                            <div class="border-b-2 border-black w-1/3" />
                                                       </div>
                                                       <div class="my-3 lg:text-lg tablet-600:text-sm text-xs text-gray-500 truncate-line__3 px-5 text-center">
                                                            {{ post.content }}
                                                       </div>
                                                  </div>
                                                  <div class="mt-3 flex justify-end">
                                                       <BtnShowMoreVue @on-Click="$router.push(`/news/${post.id}`)" />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </slide>
                         </carousel>
                    </template>
                    <template v-else>
                         <div class="w-full text-center mt-12">
                              ( bài viết trống ! )
                         </div>
                    </template>
               </div>
               <div v-if="posts.length > 0" class="flex justify-center items-center mt-12">
                    <BtnShowMoreVue @on-Click="$router.push('/news')" />
               </div>
          </div>
          <LoadingVue :loading="loading" />
     </div>
</template>
   
<script>
import { Carousel, Slide } from 'vue-carousel';
import BannerGroup from '@/components/home/BannerGroup'
import LoadingVue from '~/components/Loading.vue';
import BtnShowMoreVue from '~/components/home/BtnShowMore.vue';
import { getItem, getPost, getCategories } from '~/api/home';
   
export default {
     components: {
          Carousel, 
          Slide,
          LoadingVue,
          BtnShowMoreVue,
          BannerGroup,
     },
     async asyncData() {
          try {
               const parama = {
                    page: 1,
                    pageSize: 10,
                    order: 'ASC',
                    status: true,
               }
               const { data } = await getCategories(parama);
               return {
                    listCategory: data.data,
                    activeCategories: data.data[0].id,
               };
          } catch (error) {
               console.log(error);
          }
     },
     layout: 'home',
     mounted() {
          this.getData();
     },
     data() {
          return {
               listCategory: [],
               posts: [],
               pagePost: {
                    currentPage: null,
                    totalCount: null,
                    totalPage: null,
                    page: 1,
                    pageSize: 9,
                    order: 'DESC',
                    status: true,
               },
               activeCategories: '1',
               loading: false,
               URL: process.env.BROWSER_API_URL,
          };
     },
     methods: {
          async getData() {
               try {
                    this.loading = true;
                    await this.getDataPosts();
               } catch (error) {
                    console.log(error);
               } finally {
                    this.loading = false;
               }
          },
          async getDataPosts() {
               try {
                    this.loading = true;
                    const {data} = await getPost(this.pagePost);
                    if (data) {
                         this.posts = data.data;
                         const pagination = data.pagination;
                         this.pagePost = {
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
     },
   
};
</script>

<style lang="scss" scoped>
     .border__menu {
          border-radius: 15px 15px 0 0;
     }

     ::v-deep .vs-pagination {
          li {
               a{
                    color: white;
               }
          }
          .vs-pagination--active {
               a {
                    background: white !important;
                    border-radius: 4px;
                    color: black !important;
               }
          }
     }
     ::v-deep .VueCarousel-pagination {
          margin-top: -91px !important;
          z-index: 9999 !important;
     }
</style>
   