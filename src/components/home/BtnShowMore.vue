<template>
     <div
          @click="$emit('on-Click')"
          :class="bgBtnClass"
          class="rounded-full tablet-600:py-3 py-2 tablet-600:px-5 px-2 shadow-2xl cursor-pointer"
     >
          <p class="text-white tablet-600:text-base text-xs font-medium text-center">{{ label }}</p>
     </div>
</template>
<script>
export default {
     props: {
          bgBtnClass: {
               type: String,
               default: 'bg-black',
          },
          label: {
               type: String,
               default: 'Tìm hiểu thêm'
          }
     },
}
</script>
<style lang="scss" scoped>
     
</style>