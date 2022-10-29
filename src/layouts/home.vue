<template>
     <div>
          <HeaderHome/>
          <nuxt />
          <FooterHome />
     </div>
</template>
<script>
import HeaderHome from '~/components/header/HeaderHome.vue';
import FooterHome from '@/components/footer/FooterHome.vue'

export default {
     components: {
          HeaderHome,
          FooterHome,
     },
}
</script>
<style lang="scss">
     
</style>