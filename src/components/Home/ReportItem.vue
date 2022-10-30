<script setup>
import EditIcon from '../../assets/icons/EditIcon.vue'
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="i in 20" :key="i">
    <td class="text-center">{{i}}</td>
    <td class="py-3 px-6 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <img class="w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" />
        </div>
        <span class="text-lg font-medium">Eshal Rosas</span>
      </div>
    </td>
    <td class="py-3 px-6 text-left">
      +998(99)876-54-32
    </td>
    <td class="py-3 px-6 text-center">
      12.10.2022
    </td>
    <td class="py-3 px-6 text-center">
      premium
    </td>
    <td class="py-3 px-6 text-center">
      <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded text-xs">Routine Checkup</span>
    </td>
    <td class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        <div class="w-4 mr-2 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
