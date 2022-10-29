<template>
     <div class="relative flex">
          <div class="slider bg-bgHeaderBule fixed top-0 left-0 text-white px-6 py-4 ">
               <div class="border-b-2 border-white">
                    <p class="pl-4 pt-2 text-2xl font-bold uppercase" style="padding-bottom: 12px;">Admin</p>
               </div>
               <div class="mt-5 text-white">
                    <div class="ml-4">
                         <div class=" text-lg font-semibold">Quản lý sản phẩm</div>
                         <div class="ml-4">
                              <div class="mt-3">
                                   <NuxtLink
                                        to="/admin/product"
                                        class="cursor-pointer font-medium hover:underline hover:underline-offset-2"
                                   >Danh sách sản phẩm</NuxtLink >
                              </div>
                              <div class="mt-3">
                                   <NuxtLink
                                        to="/admin/product/list-delete"
                                        class="cursor-pointer font-medium hover:underline hover:underline-offset-2"
                                   >Danh sách sản phẩm đã xóa</NuxtLink >
                              </div>
                         </div>
                    </div>
                    <div class="ml-4 mt-5">
                         <div class=" text-lg font-semibold">Quản lý bài viết</div>
                         <div class="ml-4">
                              <div class="mt-3">
                                   <NuxtLink
                                        to="/admin/news"
                                        class="cursor-pointer font-medium hover:underline hover:underline-offset-2"
                                   >Danh sách bài viết</NuxtLink >
                              </div>
                              <div class="mt-3">
                                   <NuxtLink
                                        to="/admin/news/list-delete"
                                        class="cursor-pointer font-medium hover:underline hover:underline-offset-2"
                                   >Danh sách bài viết đã xóa</NuxtLink >
                              </div>
                         </div>
                    </div>
                    <div class="ml-4 mt-6">
                         <div class=" text-lg font-semibold">Quản lý thể loại</div>
                         <div class="ml-4 block items-center justify-start">
                              <div class="mt-3">
                                   <NuxtLink
                                        to="/admin/category"
                                        class="mt-2 cursor-pointer font-medium hover:underline hover:underline-offset-2"
                                   >Danh sách thể loại</NuxtLink >
                              </div>
                              <div class="mt-3">
                                   <NuxtLink
                                        to="/admin/category/list-delete"
                                        class="mt-2 cursor-pointer font-medium hover:underline hover:underline-offset-2"
                                   >Danh sách thể loại đã xóa</NuxtLink >
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div class="content fixed right-0 top-0 shadow-lg" style="z-index: 999; height: 70px;">
               <div class="w-full bg-bgHeaderBule h-full text-white">
                    <div class="flex justify-end mr-12 h-full">
                         <div class="ml-4 flex items-center cursor-pointer" @click="openDropdown(dropdown)">
                              <p class="text-xl font-bold">Xin Chào Admin</p>
                         </div>
                    </div>
               </div>
          </div>
          <div
               v-show="dropdown"
               class="fixed top-16 right-6 shadow-2xl rounded-b-15"
               style="z-index: 1000;top: 71px;right: 42px;"
          >
               <div class="w-60 text-white px-4 pt-6 pb-8 rounded-b-15" style="background: #0067d6;">
                    <div
                         class="cursor-pointer font-medium hover:underline hover:underline-offset-2"
                         @click="$router.push('/admin/change-password'); dropdown = false"
                    >Đổi mật khẩu</div >
                    <div 
                         class="pt-4 cursor-pointer font-medium hover:underline hover:underline-offset-2"
                         @click="loguotUesr" 
                    >Đăng xuất</div >
               </div>
          </div>
          <div class="content content-child">
               <div class="bg-white">
                    <nuxt/>
               </div>
          </div>
          <Loading :loading="loading" :left="0" />
     </div>
</template>
<script>
import { logout } from '~/api/auth';
import Loading from '@/components/Loading.vue';

export default {
     data() {
          return {
               dropdown: false,
               loading: false
          }
     },
     components: {
          Loading,
     },
     middleware: ['authenticated'],
     mixins: ['notifycation'],
     methods: {
          openDropdown(value) {
               this.dropdown = !value;
          },
          async loguotUesr() {
               try {
                    this.loading = true
                    await logout();
                    this.$store.commit('auth/set', null);
                    this.$cookies.set('token', null);
                    this.$router.push('/login');
                    this.notification('success', 'Đăng xuất thành công!');
               } catch (error) {
                    console.log('error: ', error);
               } finally {
                    this.loading = false;
               }
          },
     }
}
</script>
<style lang="scss">
     .slider {
          width: 320px;
          height: 100%;
     }
     .content {
          width: calc(100% - 320px);
          &-child {
               position: absolute;
               top: 80px;
               right: 0;
          }
     }
</style>