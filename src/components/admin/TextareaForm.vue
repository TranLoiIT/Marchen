<template>
     <div>
          <div class="flex items-center">
               <textarea
                    :value="currentValue"
                    :maxlength="maxLength"
                    :placeholder="placeholder"
                    rows="10"
                    class="w-full text-base px-4 py-2 border-2 rounded-lg focus:outline-none"
                    :class="(error) ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-bgHeaderBule'"
                    style="overflow:auto;resize:none"
                    @input="$emit('input', $event.target.value)"
                    @blur="onBlur"
               />
          </div>
          <p
               v-show="error"
               class="text-xs font-medium text-red-500"
               style="margin-top: 2px;"
          >Vui lòng không để trống!</p>
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
               default: 'text'
          },
          maxLength: {
               type: Number,
               default: 2560,
          },
          placeholder: {
               type: String,
               default: '',
          },
     },
     data() {
          return {
               currentValue: this.value,
               error: false,
          }
     },
     watch: {
          value() {
               this.currentValue = this.value;
          },
          currentValue: {
               handler() {
                    if (this.currentValue) {
                         this.error = false;
                    } else {
                         this.error = true;
                    }
               },
               deeep: true,
          }
     },
     methods: {
          onBlur() {
               if (this.currentValue) {
                    this.error = false;
               } else {
                    this.error = true;
               }
          }
     },
}
</script>
<style lang="scss">
textarea::-webkit-scrollbar {
    width: 8px;
}

textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

textarea::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 15px;
}
</style>