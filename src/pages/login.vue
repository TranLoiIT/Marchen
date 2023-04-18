<template>
     <div
          class="bg-no-repeat bg-cover bg-center relative"
     >
          <div class="absolute inset-0" style="z-index: 1;">
               <div class="h-screen opacity-25 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          </div>
          <div class="absolute inset-0 z-0">
               <img class="w-screen h-screen" src="~/assets/image/image-login.png" alt="Login" />
          </div>
          <div class="min-h-screen flex mx-0 justify-center">
               <div class="flex-col flex self-center sm:pr-10 w-2/5 z-10">
               <div class="self-start hidden lg:flex flex-col text-white">
                    <h1 class="mb-3 font-bold text-5xl">Chào mừng đến Marchen</h1>
               </div>
               </div>
               <div class="flex justify-center self-center z-10">
                    <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                         <div class="mb-4">
                              <h3 class="font-semibold text-2xl text-gray-800">Đăng nhập </h3>
                              <p class="text-gray-500">Xin hãy đăng nhập tài khoản của bạn.</p>
                              </div>
                              <div class="space-y-5">
                                   <div class="space-y-2">
                                        <label class="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                        <BaseInputVue
                                             v-model="username"
                                             :type="'text'"
                                             :placeholder="'Nhập tài khoản'"
                                        />
                                   </div>
                                   <div class="space-y-2">
                                        <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">Mật khẩu</label>
                                        <BaseInputVue
                                             v-model="password"
                                             :type="'password'"
                                             :placeholder="'Nhập mật khẩu'"
                                        />
                              </div>
                              <div class="flex items-center justify-between">
                              <div class="flex items-center">
                                   <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded">
                                   <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                                   Nhớ mật khẩu
                                   </label>
                              </div>
                              </div>
                              <div>
                                   <BaseButtonVue
                                        :placeholder="'Đăng nhập'"
                                        @on-click="handleLogin"
                                   />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <Loading :loading="loading" :left="0" />
     </div>
</template>

<script>
     import BaseInputVue from '~/components/BaseInput.vue';
     import BaseButtonVue from '~/components/BaseButton.vue';
     import Loading from '@/components/Loading.vue';
     import { login } from '@/api/auth';

     export default {
          components: {
               BaseInputVue,
               BaseButtonVue,
               Loading,
          },
          middleware: ['isLogin'],
          data() {
               return {
                    username: '',
                    password: '',
                    loading: false,
               };
          },
          methods: {
               handleLogin() {
                    if (this.username !== '' && this.password !== '') {
                         this.submitForm();
                    } else {
                         this.notification('error', 'Vui lòng điền đầy đủ thông tin!');
                    }
               },
               async submitForm() {
                    this.loading = true;
                    const dataUser = {
                         username: this.username.trim(),
                         password: this.password.trim(),
                    }
                    try {
                         const data = await login(dataUser);
                         if (data) {
                              this.$store.commit('auth/set', data.user);
                              this.$cookies.set('token', data.accessToken);
                              // this.$router.push('/admin/product/');
                              window.location.href = '/admin/product/';
                              this.notification('success', 'Đăng nhập thành công!');
                         }
                    } catch (error) {
                         console.log(error);
                         this.notification('error', 'Thông tin tài khoản không chính xác!');
                    } finally {
                         this.loading = false;
                    }
               },
               notification(status, message) {
                    this.$toast[status](message, {
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
               },
          },
     };
</script>

<style lang="scss" scoped>
::v-deep body {
     overflow: hidden;
}
</style>
