<template>
     <div>
          <input
               :value="inputValue"
               class="w-full text-base px-4 py-2 border rounded-lg focus:outline-none"
               :class="(error) ? 'focus:border-red-500 border-red-500' : 'focus:border-blue-500 border-gray-300'"
               :type="type"
               :placeholder="placeholder"
               @blur="handlerBlur"
               @input="$emit('input', $event.target.value)"
          >
          <p v-show="error" class="mt-1 text-xs font-medium text-red-500">{{ messageErr }}</p>
     </div>
</template>

<script>
     export default {
          name: 'input',
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
               messageErr: {
                    type: String,
                    default: 'Vui lòng không để trống !',
               }
          },
          data() {
               return {
                    inputValue: this.value,
                    error: false,
               }
          },
          watch: {
               value() {
                    this.inputValue = this.value;
               },
               inputValue: {
                    handler() {
                         this.handlerBlur();
                    },
                    deep: true
               }
          },
          methods: {
               handlerBlur() {
                    if (this.inputValue) {
                         this.error = false;
                    } else {
                         this.error = true;
                    }
               }
          },
     }
</script>