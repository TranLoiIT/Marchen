<template>
     <div class="text-lg font-medium h-full flex justify-start items-center">
          <div class="text-red-600 pr-1">*</div>
          <p class="flex item-center">{{ title  }}:</p>
     </div>
</template>
<script>
export default {
     props :{ 
          title: {
               type: String,
               default: ''
          },
     }
}
</script>