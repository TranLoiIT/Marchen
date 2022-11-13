<template>
     <div class="block items-center justify-start w-full">
          <div class="form-input w-full items-center">
               <input
                    id="image"
                    required
                    type="file"
                    @change="onFileChange"
               >
          </div>
          <div class="mt-4">
               <img :src="image ? image : `${URL}/uploads/${value}`" :alt="altImage" style="width: 200px;">
          </div>
          <p v-if="errorImageSize" class="text-red-600">
               Uploaded image exceeds 500kb, please choose another file
          </p>
     </div>  
</template>
<script>
export default {
     props: {
          value: {
               type: [File, String],
               default: ''
          },
          altImage: {
               type: String,
               default: 'default',
          }
     },
     data() {
          return {
               image: '',
               file: this.value,
               errorImageSize: false,
               URL: process.env.BROWSER_API_URL,
          }
     },
     watch: {
          value() { 
               this.file = this.value;
          },
          file: {
               handler() {
                    this.$emit('input', this.file);
               },
               deep: true,
          },
     },
     mounted() {
          if (this.value) {
               this.image = this.value;
          }
     },
     methods: {
          onFileChange(e) {
               const files = e.target.files || e.dataTransfer.files;
               const type = e.srcElement.id;
               if (!files.length) return;
               // if (files[0].size > 524288) {
               //      this.errorImageSize = true;
               //      this.file = '';
               // } else {
               //      this.errorImageSize = false;
                    this.file = files[0];
                    this.$emit('input', files[0]);
                    this.createImage(files[0], type);
               // }
          },
          createImage(file, type) {
               const reader = new FileReader();
               const vm = this;
               reader.onload = (e) => {
                    vm.image = e.target.result;
               };
               reader.readAsDataURL(file);
          },
     },
}
</script>
<style lang="">
     
</style>