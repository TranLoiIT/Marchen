<template>
     <div class="lg:mt-24 mt-20">
          <div class="mt-5 py-12">
               <div class="container mb-10">
                    <div class="container flex items-center justify-center mb-10">
                         <div class="w-full flex items-center">
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                              <div
                                   class="lg:text-2xl tablet-600:text-xl text-lg font-bold text-black w-full text-center uppercase"
                              >
                                   Tin tức</div>
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                         </div>
                    </div>
                    <template v-if="item.id">
                         <div class="mt-12">
                              <div class="lg:text-xl text-base font-bold">{{ item.name }}</div>
                         </div>
                         <div class="py-4 w-full">
                              <img
                                   class="w-full object-cover"
                                   :src="`${url}/uploads/${item.img_url}`"
                                   :alt="item.img_url"
                              />
                              <div class="text-sm text-center italic">{{ item.img_title }}</div>
                         </div>
                         <div class="lg:px-12 px-5 text-base">
                              <div class=" font-medium">
                                   {{ item.title }}
                              </div>
                              <div class="mt-3">
                                   {{ item.content }}
                              </div>
                              <div class="text-sm flex justify-end italic mt-3">
                                   Đăng ngày {{ formatDay(item.createdAt) }} tác giả {{ item.author }}.
                              </div>
                         </div>
                         <div class="flex justify-center items-center my-5">
                              <div class="border-b-2 border-black py-2 w-2/5" />
                         </div>
                    </template>
                    <template v-else>
                         <div class="text-center mt-12">
                              ( Bài viết không tồn tại! )
                         </div>
                    </template>
               </div>
               <div class="container flex items-center justify-center mb-10 mt-20">
                    <div class="w-4/5 flex items-center">
                         <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                              <div class="border-b-4 border-black w-full" />
                         </div>
                         <div
                              class="lg:text-2xl tablet-600:text-xl text-lg font-bold text-black w-full text-center uppercase"
                         >
                              Bài viết liên quan</div>
                         <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                              <div class="border-b-4 border-black w-full" />
                         </div>
                    </div>
               </div>
               <div class="tablet-600:my-20 my-10 tablet-600:mx-20 px-15px">
                    <template v-if="listItem.length > 0">
                         <carousel
                              :perPageCustom="[[200, 1], [768, 2], [1024, 3]]"
                              :mouse-drag="true"
                              :autoplay="true"
                              :loop="true"
                              :autoplayTimeout="5000"
                         >
                              <slide v-for="(item, index) in listItem" :key="index">
                                   <div class="flex justify-center pt-5">
                                        <div class="w-4/5 pt-5 pb-20">
                                             <div class="shadow-2xl p-3 bg-white rounded-15 z-20">
                                                  <img
                                                       class="w-full height--image_post object-cover"
                                                       :src="`${url}/uploads/${item.img_url}`"
                                                       :alt="item.img_url"
                                                  >
                                                  <div class="py-5 px-2 text-center">
                                                       <div
                                                            class="tablet-600:px-2 lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate w-full"
                                                       >{{ item.name }}</div>
                                                       <div class="flex justify-center mt-2">
                                                            <div class="border-b-2 border-black w-1/3" />
                                                       </div>
                                                       <div class="my-3 lg:text-lg tablet-600:text-sm text-xs text-gray-500 truncate-line__3 px-5 text-center">
                                                            {{ item.content }}
                                                       </div>
                                                  </div>
                                                  <div class="mt-3 flex justify-end">
                                                       <BtnShowMoreVue @on-Click="$router.push(`/news/${item.id}`)" />
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </slide>
                         </carousel>
                    </template>
                    <template v-else>
                         <div class="text-center mt-12">
                              ( Bài viết trống ! )
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
import { Carousel, Slide } from 'vue-carousel';
import { getIdPost } from '~/api/home';


export default {
     components: {
          Carousel, 
          Slide,
          LoadingVue,
          BtnShowMoreVue,
     },
     layout: 'home',
     mounted() {
          this.getData();
     },
     data() {
          return {
               item: {},
               listItem: [],
               loading: true,
               url: process.env.BROWSER_API_URL,
          };
     },
     methods: {
          async getData() {
               this.loading = true;
               try {
                    const params = this.$route.params;
                    if (params.id) {
                         const id = params.id;
                         const { data } = await getIdPost(id);
                         this.item = data.post;
                         this.listItem = data.relation;
                    }
               } catch (error) {
                    console.log(error);
               } finally {
                    this.loading = false
               }
          },
          formatDay(day) {
               return this.$dayjs(day).format('DD-MM-YYYY');
          },
     },
}
</script>
<style lang="scss" scoped>
     
</style>