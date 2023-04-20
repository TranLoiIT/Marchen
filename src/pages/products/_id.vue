<template>
     <div class="lg:mt-24 mt-20">
          <div class="mt-5 py-12">
               <div class="container mb-10">
                    <div class="container flex items-center justify-center mb-10">
                         <div class="w-full flex items-center">
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full"></div>
                              </div>
                              <div
                                   class="lg:text-2xl tablet-600:text-xl text-lg font-bold text-black w-full text-center uppercase"
                              >
                                   Thông tin sản phẩm</div>
                              <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                                   <div class="border-b-4 border-black w-full"></div>
                              </div>
                         </div>
                    </div>
                    <template v-if="product.id">
                         <div class="grid grid-cols-10 gap-8 mt-5">
                              <div class="lg:col-span-4 col-span-10">
                                   <div class="py-4 w-full">
                                        <img
                                             class="w-full object-cover shadow-2xl"
                                             :src="`${URL}/uploads/${product.img_item}`"
                                             :alt="product.img_item"
                                        />
                                   </div>
                              </div>
                              <div class="lg:col-span-6 py-4 col-span-10">
                                   <div class="flex items-center">
                                        <div class="w-1/2 lg:text-2xl text-lg font-bold">MODEL: {{ product.model }}</div>
                                        <div class="w-1/2 tablet-600:pl-10 lg:text-2xl text-lg font-bold">{{ numberFormat(product.price) }} VNĐ</div>
                                   </div>
                                   <div class="flex justify-between mt-2">
                                        <div class="flex items-center">
                                             <img src="~/assets/image/technology.png" style="width: 36px;" alt="technology">
                                             <p class="ml-1 text-sm font-thin italic">Technology by Germany</p>
                                        </div>
                                        <div class="flex tablet-600:mr-10px">
                                             <img src="~/assets/image/icon1.png" style="width: 52px;" alt="icon1">
                                             <img src="~/assets/image/icon2.png" style="width: 52px;" alt="icon2">
                                             <img src="~/assets/image/icon3.png" style="width: 52px;" alt="icon3">
                                             <img src="~/assets/image/icon4.png" style="width: 52px;" alt="icon4">
                                        </div>
                                   </div>
                                   <div class="mt-5 text-base font-normal">
                                        <span v-html="product.description"></span>
                                   </div>
                                   <div class="flex justify-end mt-5">
                                        <a href="tel:+084965020318">
                                             <div class="flex justify-end mt-5">
                                                  <div
                                                       class="rounded-full w-40 tablet-600:py-3 py-2
                                                       tablet-600:px-5 px-2 bg-bgHeaderBule text-center shadow-xl"
                                                  >
                                                       <p class="text-white tablet-600:text-base text-xs font-medium underline">
                                                            Liên hệ ngay.</p>
                                                  </div>
                                             </div>
                                        </a>
                                   </div>
                              </div>
                         </div>
                         <div class="mt-12">
                              <div class="grid grid-cols-10 gap-8 mt-5">
                                   <div class="lg:col-span-4 col-span-10">
                                        <div class="lg:text-xl text-base font-bold">- Ảnh mô tả kích thước sản phẩm: </div>
                                        <div class="py-4 pr-10 w-full">
                                             <img
                                                  class="w-full object-cover shadow-2xl"
                                                  :src="`${URL}/uploads/${product.img_thumbnail}`"
                                                  :alt="product.img_thumbnail"
                                             />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </template>
                    <template v-else>
                         <div class="text-center mt-12">
                              ( Sản phẩm không tồn tại! )
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
                              Sản phẩm liên quan</div>
                         <div class="flex items-center tablet-600:w-1/2 desktop-xs:w-3/4 w-1/4">
                              <div class="border-b-4 border-black w-full" />
                         </div>
                    </div>
               </div>
               <div class="tablet-600:my-20 mt-10 tablet-600:mx-20 px-15px">
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
                                                       :src="`${URL}/uploads/${item.img_item}`"
                                                       :alt="item.img_item"
                                                  >
                                                  <div class="lg:px-4 px-2 py-3">
                                                       <div
                                                            class="lg:text-2xl tablet-600:text-xl text-sm font-bold text-black truncate w-full"
                                                       >MODEL: {{ item.model }}</div>
                                                       <div
                                                            class="mt-3 lg:text-lg tablet-600:text-sm text-xs text-gray-500 truncate-line__2 lg:h-14 tablet-600:h-10 h-8"
                                                       >
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
                                        </div>
                                   </div>
                              </slide>
                         </carousel>
                    </template>
                    <template v-else>
                         <div class="text-center">
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
import { getIdItem } from '~/api/home';


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
               product: {},
               description_header: "",
               listItem: [],
               loading: true,
               URL: process.env.BROWSER_API_URL,
          };
     },
     head() {
          return {
               title: 'Machen | Sản phẩm | ' + this.product.model,
               meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Bếp từ Marchen | Model: ' + this.product.model + ' | ' + this.description_header,
                    },
                    {
                        hid: 'og:title',
                        property: 'og:title',
                        content: 'Machen | Sản phẩm | ' + this.product.model,
                    },
                    {
                        hid: 'og:description',
                        property: 'og:description',
                        content: 'Bếp từ Marchen | Model: ' + this.product.model + ' | ' + this.description_header,
                    },
               ],
          };
     },
     methods: {
          async getData() {
               this.loading = true;
               try {
                    const params = this.$route.params;
                    if (params.id) {
                         const id = params.id;
                         const { data } = await getIdItem(id);
                         this.product = data.item;
                         this.listItem = data.relation;
                         this.product.description = this.formatText(data.item.description);
                         this.description_header = this.formatTextHeader(this.product.description);
                    }
               } catch (error) {
                    console.log(error);
               } finally {
                    this.loading = false
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
          },
          formatTextHeader(value) {
               const data = value;
               return data.replace(/(● )+/g, "").replace(/(<br \/>)+/g, ", ");
          },
          formatText(value) {
               const data = value;
               return data.replace(/\n/g, "<br />");
          }
     },
}
</script>
<style lang="scss" scoped>
     
</style>