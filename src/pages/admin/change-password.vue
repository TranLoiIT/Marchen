<template>
     <div>
          <h1 class="px-20 py-5 text-2xl font-bold uppercase">Thay Đổi mật khẩu</h1>
          <div class="px-20 mt-12 h-full">
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Nhập mật khẩu cũ'" />
                    </div>
                    <div class="col-span-3">
                         <BaseInputPasswordVue
                              v-model="formData.currentPassword"
                              :type="'password'"
                              :placeholder="'Nhập mật khẩu'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Nhập mật khẩu mới'" />
                    </div>
                    <div class="col-span-3">
                         <BaseInputPasswordVue
                              v-model="formData.newPassword"
                              :type="'password'"
                              :placeholder="'Nhập mật khẩu'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Nhập lại mật khẩu'" />
                    </div>
                    <div class="col-span-3">
                         <BaseInputPasswordVue
                              v-model="formData.verifyPassword"
                              :type="'password'"
                              :placeholder="'Nhập mật khẩu'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5">
                <div class="col-span-4 flex items-center justify-end my-20">
                    <BaseBtn
                        :placeholder="'Lưu'"
                        :disabled="disabled"
                        @on-click="handlerClick"
                    />
                </div>
            </div>
        </div>
        <LoadingVue :loading="loading" />
     </div>
</template>
<script>
import { mapState } from 'vuex';
import InputFormVue from '~/components/admin/InputForm.vue';
import lableFormVue from '~/components/admin/LableForm.vue';
import BaseInputVue from '~/components/BaseInput.vue';
import BaseInputPasswordVue from '~/components/admin/BaseInputPassword.vue';
import LoadingVue from '~/components/Loading.vue';
import { changePassword } from '~/api/user';

export default {
     layout: 'admin',
     components: {
          InputFormVue,
          lableFormVue,
          BaseInputVue,
          LoadingVue,
          BaseInputPasswordVue,
     },
     middleware: 'authenticated',
     data() {
          return {
               formData: {
                    currentPassword: '',
                    newPassword: '',
                    verifyPassword: '',
               },
               loading: false,
               disabled: true,
          }
     },
     computed: {
          ...mapState('auth', {
               user: (state) => state.user,
          }),
     },
     watch:{
          formData: {
               handler() {
                    if (
                         this.formData.currentPassword !== '' && this.formData.newPassword !== '' && this.formData.verifyPassword !== ''
                    ) {
                         if (
                              this.formData.currentPassword.length >= 5
                              && this.formData.newPassword.length >= 5
                              && this.formData.verifyPassword.length >= 5
                         ) {
                              this.disabled = false
                         } else {
                              this.disabled = true
                         }
                    } else {
                         this.disabled = true
                    }
               },
               deep: true,
          },
     },
     methods: {
          async submitData() {
               try {
                    const password = this.formData.newPassword;
                    const id = this.user.id;
                    const { data } = await changePassword(id, {password});
                    if (data) {
                         this.notification('success', 'Thay đổi mật khẩu thành công!');
                         this.$store.commit('auth/set', null);
                         this.$cookies.set('token', null);
                         this.$router.push('/login');
                    }
               } catch (error) {
                    if (error.response.data.statusCode === 401) {
                         this.notification('error', error.response.data.message);
                         this.$store.commit('auth/set', null);
                         this.$cookies.set('token', null);
                         this.$router.push('/login');
                    } else {
                         this.notification('error', error.message);
                    }
               } finally {
                    this.loading = false
               }
          },
          handlerClick(event) {
               if (event === 'error') {
                    if (
                         this.formData.currentPassword.length < 5
                         && this.formData.newPassword.length < 5
                         && this.formData.verifyPassword.length < 5
                    ) {
                         this.notification('error', 'Vui nhập mập khẩu t trên 6 kí tự!');
                    } else {
                         this.notification('error', 'Vui lòng điền đầy đủ thông tin!');
                    }
               }
               if (event === 'success') {
                    if(this.formData.newPassword === this.formData.verifyPassword) {
                         this.submitData();
                    } else {
                         this.notification('error', 'mật khẩu mới không trùng khớp !');
                    }
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
}
</script>
<style lang="">
     
</style>