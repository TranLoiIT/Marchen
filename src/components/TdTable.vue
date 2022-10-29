<template>
     <td>
          <div :style="{width : rowWidth + 'px'}">
               <div v-if="actions === true" class="flex cursor-pointer w-full">
                    <div v-if="restore">
                         <div @click="handlerClick('restore', idTable)">
                              khôi phục
                         </div>
                    </div>
                    <div v-else class="flex items-center font-medium">
                         <div
                              class="mr-5 bg-bgHeaderBule rounded-15 px-4 py-2 flex justify-center items-center text-white shadow-md w-28"
                              @click="handlerClick('edit', idTable)"
                         >
                              cập nhập
                         </div>
                         <div
                              class="bg-red-500 rounded-15 px-4 py-2 flex justify-center items-center text-white shadow-md"
                              @click="handlerClick('delete', idTable)"
                         >
                              xóa
                         </div>
                    </div>
               </div>
               <div v-else class="truncate">
                    {{ nameTable }}
               </div>
          </div>
     </td>
 </template>
 <script>
     export default {
          props: {
               nameTable: {
                    type: [String, Number, Boolean],
                    default: '',
               },
               rowWidth: {
                    type: Number,
                    default: 200,
               },
               actions: {
                    type: Boolean,
                    default: false,
               },
               restore: {
                    type: Boolean,
                    default: false,
               },
               idTable: {
                    type: [String, Number],
                    default: '',
               },
          },
          methods: {
               handlerClick(action, value) {
                    this.$emit('on-click', { type: action, value });
               },
          },
     };
 </script>
 