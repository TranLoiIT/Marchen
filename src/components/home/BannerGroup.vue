<template>
     <div>
          <carousel
               :per-page="1"
               :mouse-drag="true"
               :autoplay="true"
               :loop="true"
               :autoplayTimeout="5000"
          >
               <slide>
                    <div>
                         <img class="w-full object-cover baner-h" src="~/assets/image/banner1.jpg" alt="" />
                    </div>
               </slide>
               <slide>
                    <div>
                         <img class="w-full object-cover baner-h" src="~/assets/image/banner2.jpg" alt="" />
                    </div>
               </slide>
               <slide>
                    <div>
                         <img class="w-full object-cover baner-h" src="~/assets/image/banner3.png" alt="" />
                    </div>
               </slide>
          </carousel>
     </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
     components: {
          Carousel, 
          Slide,
     },
}
</script>
<style lang="scss" scoped>
     ::v-deep .VueCarousel-pagination {
          margin-top: -91px !important;
          z-index: 9999 !important;
     }
</style>