<template>
     <div class="lg:mt-24 mt-20">
          <div class="mt-5 py-12">
               <div class="container mb-10">
                    <div class="flex justify-center">
                         <div class="w-4/5 flex items-center">
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                              <div
                                   class="lg:text-2xl tablet-600:text-xl text-lg font-bold text-black w-full text-center uppercase"
                              >
                                   Danh sách bài viết</div>
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full" />
                              </div>
                         </div>
                    </div>
                    <template v-if="listItem.length > 0">
                         <div class="grid desktop-xs:grid-cols-3 grid-cols-2 lg:gap-8 gap-2 lg:mt-20 mt-10">
                              <div
                                   v-for="(item, index) in listItem"
                                   :key="index"
                                   class="col-span-1 bg-white rounded-15 shadow-xl height--card"
                              >
                                   <img
                                        class="w-full rounded-t-15 object-cover height--image"
                                        :src="`${URL}/uploads/${item.img_url}`"
                                        :alt="item.img_url"
                                   >
                                   <div class="lg:px-4 px-2 py-3 text-center">
                                        <div
                                             class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate w-full"
                                        >{{ item.name }}</div>
                                        <div class="flex justify-center items-center">
                                             <div class="border-b border-black py-2 w-2/5" />
                                        </div>
                                        <div class="mt-3 lg:text-lg tablet-600:text-sm text-xs text-gray-500 truncate-line__2 lg:h-14 tablet-600:h-10 h-8">
                                             {{ item.content }}
                                        </div>
                                        <div class="mt-3 tablet-600:flex justify-end items-center">
                                             <div class="mt-3 tablet-600:mt-0">
                                                  <BtnShowMoreVue @on-Click="hanlderClick(item.id)" />
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
                         <div class="mt-12 text-center">
                              ( Bài viết trống )
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
import { getPost } from '~/api/home';


export default {
     components: {
          LoadingVue,
          BtnShowMoreVue,
     },
     layout: 'home',
     mounted() {
          this.getDataNews();
     },
     data() {
          return {
               pageItem: {
                    currentPage: null,
                    totalCount: null,
                    totalPage: null,
                    page: 1,
                    pageSize: 9,
                    order: 'DESC',
               },
               listItem: [],
               loading: false,
               activeCategories: '1',
               URL: process.env.BROWSER_API_URL,
          }
     },
     head() {
          return {
                title: 'Machen | Bài viết',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Marchen Việt Nam là công ty phân phối độc quyền các sản phẩm, thiết bị nhà bếp độc quyền của thương hiệu Marchen. Chúng tôi luôn tự hào là đối tác tin cậy, nơi cung cấp các sản phẩm chính hãng, giá cả hợp lý của thương hiệu thiết bị bếp cao cấp Marchen.',
                    },
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: 'Machen | Bài viết',
                    },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: 'Marchen Việt Nam là công ty phân phối độc quyền các sản phẩm, thiết bị nhà bếp độc quyền của thương hiệu Marchen. Chúng tôi luôn tự hào là đối tác tin cậy, nơi cung cấp các sản phẩm chính hãng, giá cả hợp lý của thương hiệu thiết bị bếp cao cấp Marchen.',
                    },
                ],
            };
        },
     methods: {
          async getDataNews() {
               try {
                    this.loading = true;
                    const {data} = await getPost(this.pageItem);
                    if (data) {
                         this.listItem = data.data;
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
          hanlderClick(id) {
               if (id) {
                    this.$router.push(`/news/${id}`);
               }
          }
     },
}
</script>
<style lang="scss" scoped>
     
</style>