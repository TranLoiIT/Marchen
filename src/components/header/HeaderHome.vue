<template>
     <div>
          <div
               class="bg-black py-1 text-xs w-full text-center text-white"
               style="position: fixed;top: 0;left: 0;right: 0;z-index: 999999;"
          >
               Đang trong quá trình thử nghiệm.
          </div>
          <div class="header header--h shadow-xl">
               <div class="container">
                    <div class=" grid grid-cols-12 gap-5">
                         <div class="lg:col-span-3 col-span-6">
                              <img @click="$router.push('/'); sreach = ''" class="header--h cursor-pointer" src="~/assets/image/logo.png" />
                              <!-- <img @click="$router.push('/')" class="cursor-pointer" src="~/assets/image/logo.png" style="height: 78px !important;" /> -->
                         </div>
                         <div class="col-span-6 lg:flex hidden items-center xl:gap-8 desktop-md:gap-12">
                              <div
                                   class="text-base font-semibold uppercase cursor-pointer hover:text-bgHeaderBule hover:opacity-50 mr-6"
                                   @click="showMenu = false; $router.push('/'); sreach = ''"
                              >Trang chủ</div>
                              <div
                                   class="text-base font-semibold uppercase cursor-pointer hover:text-bgHeaderBule hover:opacity-50 mr-6"
                                   @click="showMenu = false; $router.push('/products'); sreach = ''"
                              >Sản phẩm</div>
                              <div
                                   class="text-base font-semibold uppercase cursor-pointer hover:text-bgHeaderBule hover:opacity-50"
                                   @click="showMenu = false; $router.push('/news'); sreach = ''"
                              >Bài viết</div>
                         </div>
                         <div class="lg:col-span-3 col-span-6 flex justify-end items-center">
                              <div class="w-4/5 tablet-768:flex hidden">
                                   <BaseInputSreachVue v-model="sreach" @value-sreach="hanlderSreach" />
                              </div>
                              <div
                                   class="w-1/5 lg:hidden flex items-center justify-end ml-5 cursor-pointer"
                                   @click="hanlderClick(showMenu)"
                              >
                                   <img class="w-6 h-6" src="~/assets/image/menu.png" alt="icon-menu">
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div class="lg:hidden">
               <div v-show="showMenu" class="memu">
                    <div class="my-5 ml-5">
                         <div
                              class="text-base font-semibold uppercase cursor-pointer hover:text-bgHeaderBule hover:opacity-50 mr-6 border-b border-gray-400 pb-2"
                              @click="showMenu = false; $router.push('/'); sreach = ''"
                         >Trang chủ</div>
                         <div
                              class="mt-3 text-base font-semibold uppercase cursor-pointer hover:text-bgHeaderBule hover:opacity-50 mr-6 border-b border-gray-400 pb-2"
                              @click="showMenu = false; $router.push('/products'); sreach = ''"
                         >Sản phẩm</div>
                         <div
                              class="mt-3 text-base font-semibold uppercase cursor-pointer hover:text-bgHeaderBule hover:opacity-50 mr-6 border-b border-gray-400 pb-2"
                              @click="showMenu = false; $router.push('/news'); sreach = ''"
                         >Bài viết</div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import BaseInputSreachVue from '../BaseInputSreach.vue';

export default {
     components: {
          BaseInputSreachVue,
     },
     data() {
          return {
               sreach: '',
               showMenu: false,
          }
     },
     mounted() {
          this.sreach = this.$route.query?.search || '';
     },
     methods: {
          hanlderSreach(event) {
               this.sreach = event;

               let query = { search: this.sreach };
               if (this.$route.query?.categoryId) {
                    const categoryId = this.$route.query.categoryId;
                    query = { categoryId , ...query}
               }
               this.$router.push({ path: '/products', query: query });
          },
          hanlderClick(value) {
               this.showMenu = !value;
          },
     },
}
</script>

<style lang="scss" scoped>
     .header {
          background: #FFFFFF;
          position: fixed;
          z-index: 99999;
          // top: 0;
          top: 24px;
          right: 0;
          left: 0;
          &--h {
               height: 82px;
          }
     }

     .memu {
          background: #FFFFFF;
          position: fixed;
          z-index: 99999;
          border-top: 2px solid rgb(75, 85, 99);
          // top: 82px;
          top: 106px;
          right: 0;
          height: calc(100vh - 56px);
          width: 90%;
     }

     @media screen and (min-width: 1024px) {
          .header {
          background: #FFFFFF;
          position: fixed;
          z-index: 99999;
          // top: 0;
          top: 24px;
          right: 0;
          left: 0;
          &--h {
               height: 98px !important;
          }
     }
     }
</style>
