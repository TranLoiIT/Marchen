<template>
     <div
          class="rounded-md shadow-md py-4 w-180px cursor-pointer"
          :class="customClass"
          :style="(disabled) ? 'opacity: 0.5' : ''"
          @click="hanlderClick"
     >
          <p class="text-white text-base font-bold text-center flex justify-center items-center">{{ placeholder }}</p>
     </div>
</template>
<script>
     export default {
          props: {
               placeholder: {
                    type: String,
                    default: '',
               },
               customClass: {
                    type: String,
                    default: 'bg-bgHeaderBule',
               },
               disabled: {
                    type: Boolean,
                    default: false,
               },
          },
          methods: {
               hanlderClick() {
                    if (!this.disabled) {
                         this.$emit('on-click', 'success');
                    } else {
                         this.$emit('on-click', 'error');
                    }
               },
          },
     }
</script>
<style lang="">
     
</style>