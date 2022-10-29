<template>
    <div>
        <h1 class="px-20 py-5 text-2xl font-bold uppercase">Thêm mới thể loại</h1>
        <div class="px-20 mt-12">
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Tên thể loại'" />
                </div>
                <div class="col-span-3">
                    <InputFormVue
                        v-model="name"
                        :type="'text'"
                        :maxLength="56"
                        :placeholder="'nhập tên thể loại'"
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
        <Loading :loading="loading" />
    </div>
</template>

<script>
import InputFormVue from '~/components/admin/InputForm.vue';
import lableFormVue from '~/components/admin/LableForm.vue';
import Loading from '@/components/Loading.vue';
import BaseBtn from '@/components/BaseBtn.vue';
import { createCategory } from '~/api/category';
 
export default {
    layout: 'admin',
    components: {
        InputFormVue,
        lableFormVue,
        Loading,
        BaseBtn,
    },
    data() {
        return {
            name: '',
            disabled: true,
            loading: false,
        }
    },
    watch:{
        name: {
            handler() {
                if (this.name != '') {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            deep: true
        }
    },
    methods: {
        async submitData() {
            try {
                this.loading = true;
                const {data} = await createCategory({name: this.name})
                if (data) {
                    this.$router.push('/admin/category');
                    this.notification('success', 'Thêm mới thể loại thành công!');
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
                this.notification('error', 'Vui lòng điền đầy đủ thông tin!');
            }
            if (event === 'success') {
                this.submitData();
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
<style lang="scss">
      
</style>