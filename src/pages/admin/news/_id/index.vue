<template>
     <div>
          <h1 class="px-20 py-5 text-2xl font-bold uppercase">Thêm mới bài viết</h1>
          <div class="px-20 mt-12">
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Tên bài viết'" />
                    </div>
                    <div class="col-span-3">
                         <InputFormVue
                         v-model="data.name"
                         :type="'text'"
                         :max-length="120"
                         :placeholder="'Nhập tên bài viết'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Tiêu đề bài viết'" />
                    </div>
                    <div class="col-span-3">
                         <InputFormVue
                         v-model="data.title"
                         :type="'text'"
                         :maxLength="120"
                         :placeholder="'Nhập tiêu đề bài viết'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Tên tác giả'" />
                    </div>
                    <div class="col-span-3">
                         <InputFormVue
                         v-model="data.author"
                         :type="'text'"
                         :maxLength="50"
                         :placeholder="'Nhập tên tác giả'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Nội dung bài viết'" />
                    </div>
                    <div class="col-span-3">
                         <TextareaFormVue
                         v-model="data.content"
                         :placeholder="'Nhập nội dung bài viết'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Nhập tiêu đề ảnh'" />
                    </div>
                    <div class="col-span-3">
                         <InputFormVue
                         v-model="data.img_title"
                         :type="'text'"
                         :maxLength="120"
                         :placeholder="'Nhập tiêu đề ảnh'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5 mb-5">
                    <div class="col-span-1">
                         <lableFormVue :title="'Ảnh bài viết'" />
                    </div>
                    <div class="col-span-3">
                         <ImageFormVue
                         v-model="data.file"
                         :alt-image="'ảnh-sản-phẩm'"
                         />
                    </div>
               </div>
               <div class="grid grid-cols-5">
                    <div class="col-span-4 flex items-center justify-end my-20">
                         <BaseBtn
                         :placeholder="'Lưu bài viết'"
                         :disabled="disabled"
                         @on-click="handlerClick"
                         />
                    </div>
               </div>
          </div>
          <Loading :loading="loading" :left="-320" :top="-80" :height="'1132px'" />
     </div>
</template>
<script>
     import InputFormVue from '~/components/admin/InputForm.vue';
     import lableFormVue from '~/components/admin/LableForm.vue';
     import TextareaFormVue from '~/components/admin/TextareaForm.vue';
     import ImageFormVue from '~/components/admin/ImageForm.vue';
     import BaseBtn from '~/components/BaseBtn.vue';
     import Loading from '~/components/Loading.vue';
     import { getIdPost, updatePost } from '~/api/new';
     
export default {
     layout: 'admin',
     components: {
          InputFormVue,
          lableFormVue,
          TextareaFormVue,
          ImageFormVue,
          BaseBtn,
          Loading,
     },
     data() {
          return {
               data: {
                    name: '',
                    title: '',
                    file: '',
                    img_title: '',
                    content: '',
                    author: '',
               },
               disabled: true,
               loading: false,
               postID: null,
          }
     },
     watch:{
          data: {
               handler() {
                    if (
                         this.data.name !== '' && this.data.title !== '' && this.data.file !== ''
                         && this.data.img_title !== '' && this.data.content !== '' && this.data.author !== ''
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
          this.postID = this.$route.params.id;
          this.getDataPost(this.postID);
     },
     methods: {
          async getDataPost(ID) {
               try {
                    this.loading = true;
                    const { data } = await getIdPost(ID);
                    if (data) {
                         this.data = data.post;
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
          async submitData() {
               this.loading = true;
               const formData = new FormData();
               formData.append('name', this.data.name);
               formData.append('title', this.data.title);
               formData.append('img_title', this.data.img_title);
               formData.append('content', this.data.content);
               formData.append('author', this.data.author);
               formData.append('file', this.data.file);
               try {
                    const { data } = await updatePost(this.postID, formData);
                    if (data) {
                         this.notification('success', 'Cập nhập bài viết thành công!');
                         this.$router.push('/admin/news');
                    }
               } catch (error) {
                    console.log('error: ', error);
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
.vs-pagination {
     li {
          a {
               font-size: 18px !important;
               font-weight: 600 !important;
          }
     }
     &--active {
          a {
               background: rgba(190, 190, 190, 0.5) !important;
          }
     }
}
</style>