<template>
     <div>
          <select
               v-model="currentValue"
               class="w-full text-base px-4 py-2 border-2 rounded-lg focus:outline-none"
               :class="(error) ? 'focus:border-red-500 border-red-500' : 'focus:border-blue-500 border-gray-300'"
               @blur="handlerBlur"
               @change="hanlderChange"
          >
               <option v-if="!hiddenValueDefaul" value="" selected>--- {{ placeholder }} ---</option>
               <option
                    v-for="(item, index) in listData"
                    :key="index"
                    :value="item.id"
                    :selected="(item.id === currentValue) ? true : false"
               >
                    {{ item.name }}
               </option>
          </select>
          <p v-show="error" class="mt-1 text-xs font-medium text-red-500">{{ messageErr }}</p>
     </div>
</template>
<script>
export default {
     props: {
          value: {
               type: String,
               default: '',
          },
          placeholder: {
               type: String,
               default: 'chọn thể loại'
          },
          listData: {
               type: Array,
               default() {
                    return [];
               },
          },
          messageErr: {
               type: String,
               default: 'Vui lòng không để trống !',
          }
     },
     data() {
          return {
               currentValue: this.value,
               hiddenValueDefaul: false,
               error: false,
          }
     },
     watch: {
          value() {
               this.currentValue = this.value;
          },
          currentValue: {
               handler() {
                    this.handlerBlur();
               },
               deep: true
          }
     },
     methods: {
          hanlderChange(event) {
               if (event.target.value != 0) {
                    this.hiddenValueDefaul = true;
                    this.$emit('input', event.target.value);
               }
          },
          handlerBlur() {
               if (this.currentValue) {
                    this.error = false;
               } else {
                    this.error = true;
               }
          }
     },
}
</script>
<style lang="scss" scoped>
     
</style>