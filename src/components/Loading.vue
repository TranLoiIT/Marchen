<template>
     <div v-if="loading">
          <div
               class="fixed inset-0 h-screen w-screen bg-gray-400 opacity-50"
               style="z-index: 9999999;"
          >
               <div class="flex justify-center items-center h-full">
                    <div class="text-base font-medium text-white">
                         <img  class="loading" src="~/assets/image/loading.svg" alt="loading">
                    </div>
               </div>
          </div>
     </div>
</template>
<script>
     export default {
          props: {
               loading: {
                    type: Boolean,
                    default: false,
               },
               left: {
                    type: [Number, String],
                    default: 320,
               },
               top: {
                    type: [Number, String],
                    default: 0,
               },
               height: {
                    type: String,
                    default: '100vh'
               },
          },
     };
</script>

<style lang="css">

.loading {
  animation: rotation 1.5s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
 