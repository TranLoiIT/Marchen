<template>
     <div>
          <button 
               class="w-full flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                    hover:opacity-75 text-gray-100 p-3 rounded-full tracking-wide font-semibold 
                    shadow-lg cursor-pointer transition ease-in duration-500"
               :class="customClass"
               :disabled="disabled"
               :style="(disabled) ? 'opacity: 0.5' : ''"
               @click="$emit('on-click')"
          >
               {{ placeholder }}
          </button>
     </div>
</template>

<script>
     export default {
          name: 'input',
          props: {
               placeholder: {
                    type: String,
                    default: '',
               },
               customClass: {
                    type: String,
                    default: '',
               },
               disabled: {
                    type: Boolean,
                    default: false,
               },
          },
          data() {
               return {
                    inputValue: this.value,
               }
          },
          watch: {
               value() {
                    this.inputValue = this.value;
               }
          },
          methods: {
               onClick() {
                    this.$emit('on-click');
               },
          },
     }
</script>