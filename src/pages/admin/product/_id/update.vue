<template>
    <div>
        <h1 class="px-20 py-5 text-2xl font-bold uppercase">Cập nhập thông tin sản phẩm</h1>
        <div class="px-20 mt-12">
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Model sản phẩm'" />
                </div>
                <div class="col-span-3">
                    <InputFormVue
                        v-model="formData.model"
                        :placeholder="'nhập model sản phẩm'"
                        :type="'text'"
                    />
                </div>
            </div>
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Giá sản phẩm'" />
                </div>
                <div class="col-span-3">
                    <InputFormVue
                        v-model="formData.price"
                        :placeholder="'nhập giá sản phẩm'"
                        :type="'text'"
                    />
                </div>
            </div>
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Thể loại sản phẩm'" />
                </div>
                <div class="col-span-3">
                    <BaseSelect 
                        v-model="formData.categoryId"
                        :list-data="category"
                    />
                </div>
            </div>
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Kiểu sản phẩm'" />
                </div>
                <div class="col-span-3">
                    <div class="col-span-3">
                        <BaseSelect 
                            v-model="formData.type"
                            :placeholder="'chọn kiểu sản phẩm'"
                            :list-data="type"
                        />
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Mô tả sản phẩm'" />
                </div>
                <div class="col-span-3">
                    <TextareaFormVue
                        v-model="formData.description"
                        :placeholder="'nhập mô tả sản phẩm'"
                    />
                </div>
            </div>
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Ảnh sản phẩm'" />
                </div>
                <div class="col-span-3">
                    <ImageFormVue
                        v-model="formData.img_item"
                        :alt-image="'ảnh-sản-phẩm'"
                    />
                </div>
            </div>
            <div class="grid grid-cols-5 mb-5">
                <div class="col-span-1">
                    <lableFormVue :title="'Ảnh mô hình'" />
                </div>
                <div class="col-span-3">
                    <ImageFormVue
                        v-model="formData.img_thumbnail"
                        :alt-image="'ảnh-sản-phẩm'"
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
    import TextareaFormVue from '~/components/admin/TextareaForm.vue';
    import ImageFormVue from '~/components/admin/ImageForm.vue';
    import Loading from '~/components/Loading.vue';
    import BaseSelect from '~/components/admin/BaseSelect.vue';
    import { getCategory } from '~/api/category';
    import { getIdItem, updateItem } from '~/api/item';

export default {
    layout: 'admin',
    components: {
        InputFormVue,
        lableFormVue,
        TextareaFormVue,
        ImageFormVue,
        BaseSelect,
        Loading,
    },
    middleware: 'authenticated',
    async asyncData() {
        try {
            const page = 1;
            const pageSize = 20;
            const { data } = await getCategory({page, pageSize});
            return {
                category: data.data,
            };
        } catch (error) {
           console.log(error); 
        }
    },
    data() {
        return {
            formData: {
                model: '',
                price: '',
                categoryId: '',
                type: '',
                description: '',
                img_item: null,
                img_thumbnail: null,
            },
            type: [
                {
                    id: 'best seller',
                    name: 'Sản phẩm bán chạy',
                },
                {
                    id: 'new product',
                    name: 'Sản phẩm mới',
                },
            ],
            disabled: true,
            loading: false,
            itemID: '',
        }
    },
    watch:{
        formData: {
            handler() {
                if (
                    this.formData.model !== '' && this.formData.price !== '' && this.formData.categoryId !== ''
                    && this.formData.type !== '' && this.formData.description !== ''
                    && this.formData.img_item !== '' && this.formData.img_thumbnail !== ''
                ) {
                    this.disabled = false
                } else {
                    this.disabled = true
                }
            },
            deep: true,
        },
    },
    mounted() {
        const ID = this.$route.params.id;
        this.itemID = ID;
        this.getData(ID);
    },
    methods: {
        async getData(Id) {
            try {
                const { data } = await getIdItem(Id);
                if (data) {
                    this.formData = {
                        ...data.item,
                        categoryId: data.item.category.id,
                    };
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
        async submitData() {
            this.loading = true;
            const formData = new FormData();
            formData.append('model', this.formData.model);
            formData.append('price', this.formData.price);
            formData.append('categoryId', this.formData.categoryId);
            formData.append('type', this.formData.type);
            formData.append('description', this.formData.description);
            formData.append('img_item', this.formData.img_item);
            formData.append('img_thumbnail', this.formData.img_thumbnail);
            try {
                const { data } = await updateItem(this.itemID, formData);
                if (data) {
                    this.$router.push('/admin/product');
                }
                this.notification('success', 'Cập nhập sản phẩm thành công!');
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