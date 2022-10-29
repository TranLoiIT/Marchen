<template>
     <div
          v-if="showMemo"
          class="fixed inset-0 h-screen w-screen bg-memo"
          style="z-index: 99999;"
     >
          <div
               class="flex justify-center items-center h-full"
          >
               <div class="rounded-15 desktop-lg:w-1/3 w-2/5 desktop-lg:h-1/3 h-2/5 shadow-xl" style="background-color: white;">
                    <div class="w-full flex justify-end mt-15px pr-15px">
                         <img
                              @click="clickCancel"
                              class="cursor-pointer"
                              src="~/assets/image/close.png"
                              alt="close"
                              style="width: 20px; height: 20px;"
                         >
                    </div>
                    <div class=" text-center text-xl font-medium h-3/5">
                         <div class="flex justify-center items-center h-full px-12 py-5">
                              {{ title }}
                         </div>
                    </div>
                    <div class="w-full mt-3">
                         <div class="grid grid-cols-6 gap-12 text-white text-xl font-semibold text-center">
                              <div class="col-span-3 flex justify-center">
                                   <div
                                        class="bg-red-500 rounded-15 w-44 px-8 py-4 cursor-pointer"
                                        @click="clickCancel"
                                   >
                                        Hủy
                                   </div>
                              </div>
                              <div class="col-span-3 flex justify-center">
                                   <div
                                        class="bg-bgHeaderBule rounded-15 w-44 px-8 py-4 cursor-pointer"
                                        @click="clickComfirm"
                                   >
                                        Xác nhận
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>
<script>
export default {
     props: {
          title: {
               type: String,
               default: '',
          },
          showMemo: {
               type: Boolean,
               default: false,
          },
     },
     methods: {
          clickComfirm() {
               this.$emit('comfirm');
          },
          clickCancel() {
               this.$emit('cancel');
          },
     },
}
</script>
<style lang="scss" scoped>
     .bg-memo{
          background-color: rgba($color: #055DBC, $alpha: 0.5);
     }
</style>