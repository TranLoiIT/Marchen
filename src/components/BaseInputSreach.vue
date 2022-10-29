<template>
     <div
          class="w-full text-base px-4 py-2 border rounded-3xl border-gray-300 flex justify-start items-center"
          @click="hanlderClick"
     >
          <div class="lg:mr-2 -ml-2" @click="hanlderClick">
               <img class="lg:h-6 lg:w-6 w-4 h-4" src="~/assets/image/sreach.svg" alt="sreach">
          </div>
          <input
               ref="inputSreach"
               v-model="inputValue"
               maxlength="256"
               class="border-none focus:outline-none bg-none"
               style="width: 90%;"
               :type="type"
               @keyup.enter="$emit('value-sreach', $event.target.value)"
          >
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
                    default: 'text',
               },
               customClass: {
                    type: String,
                    default: '',
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
               },
          },
          methods: {
               hanlderClick() {
                    const input = this.$refs.inputSreach;
                    if (this.inputValue) {
                         this.$emit('value-sreach', this.inputValue);
                    } else {
                         if (input) {
                              input.focus();
                         }
                    }
               },
          },
     }
</script>