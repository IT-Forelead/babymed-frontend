<script setup>
import { useDropStore } from '../../../store/drop.store'
const paritentClicked = (data) => {
  useDropStore().setSelectPatient(data)
  useDropStore().closeDropDown()
}
</script>
<template>
  <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" v-for="i in 5" :key="i" @click="paritentClicked(i)">{{ i }}</div>
</template>
