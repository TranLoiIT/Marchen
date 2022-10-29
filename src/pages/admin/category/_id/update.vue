<template>
    <div>
        <h1 class="px-20 py-5 text-2xl font-bold uppercase">Cập nhập thông tin thể loại</h1>
        <div class="px-20 mt-12">
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <LableFormVue :title="'Tên thể loại'" />
                </div>
                <div class="col-span-3">
                    <InputFormVue
                        v-model="name"
                        :type="'text'"
                        :maxLength="56"
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
import LableFormVue from '~/components/admin/LableForm.vue';
import Loading from '@/components/Loading.vue';
import { getIdCategory, updateCategory } from '~/api/category';
 
export default {
    layout: 'admin',
    components: {
        InputFormVue,
        LableFormVue,
        Loading,
    },
    data() {
        return {
            name: '',
            data: {},
            iDCategories: null,
            disabled: true,
            loading: false,
        }
    },
    mounted() {
        this.iDCategories = this.$route.params.id;
        this.getDataCateGories(this.iDCategories);
    },
    watch:{
        name: {
            handler() {
                if (this.name != '' && this.name != this.data.name) {
                    this.disabled = false;
                } else {
                    this.disabled = true;
                }
            },
            deep: true
        }
    },
    methods: {
        async getDataCateGories(id) {
            try {
                this.loading = true;
                const { data } = await getIdCategory(id);
                if (data) {
                    this.name = data.name;
                    this.data = data;
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
                this.loading = false;
            }
        },
        async submitData() {
            try {
                this.loading = true;
                const { data } = await updateCategory(this.iDCategories, { name: this.name });
                if (data) {
                    this.notification('success', 'Cập nhập thành công!');
                    this.$router.push('/admin/category');
                }
            } catch (error) {
                console.log('err: ', error);
                if (error.response.data.statusCode === 401) {
                    this.notification('error', error.response.data.message);
                    this.$store.commit('auth/set', null);
                    this.$cookies.set('token', null);
                    this.$router.push('/login');
                } else {
                    this.notification('error', error.message);
                }
            } finally {
                this.loading = false;
            }
        },
        handlerClick(event) {
            if (event === 'error') {
                if (this.name === this.data.name) {
                    this.notification('error', 'Dữ liệu chưa thay đổi!');
                }
                if (this.name === '') {
                    this.notification('error', 'Vui lòng điền đầy đủ thông tin!');
                }
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