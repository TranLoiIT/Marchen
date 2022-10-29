<template>
     <div>
          <input
               :value="inputValue"
               class="w-full text-base px-4 py-2 border rounded-lg focus:outline-none"
               :class="(error) ? 'focus:border-red-500 border-red-500' : 'focus:border-blue-500 border-gray-300'"
               :type="type"
               :placeholder="placeholder"
               @blur="handlerEmitData"
               @input="handlerEmitData"
          >
          <p v-show="error" class="mt-1 text-xs font-medium text-red-500">{{ messageErr }}</p>
     </div>
</template>

<script>
     export default {
          props: {
               value: {
                    type: [String, Number],
                    default: '',
               },
               type: {
                    type: String,
                    default: 'text',
               },
               placeholder: {
                    type: String,
                    default: '',
               },
               customClass: {
                    type: String,
                    default: '',
               },
          },
          data() {
               return {
                    inputValue: this.value,
                    error: false,
                    messageErr: '',
               }
          },
          watch: {
               value() {
                    this.inputValue = this.value;
               },
          },
          methods: {
               handlerEmitData(event) {
                    if (this.inputValue) {
                         if (this.inputValue.length >= 5) {
                              this.error = false;
                         } else {
                              this.messageErr = true
                              this.messageErr = 'Vui nhập trên 6 ký tự!';
                         }
                    } else {
                         this.messageErr = 'Vui lòng không để trống !';
                         this.error = true;
                    }
                    this.$emit('input', event.target.value)
               }
          },
     }
</script>