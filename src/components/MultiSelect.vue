<script setup>
import { toRefs } from 'vue'
import MdiCheck from '../assets/icons/MdiCheck.vue'
import { useMultiSelectStore } from '../stores/multiselect.store.js'

const store = useMultiSelectStore()

const props = defineProps({
  options: Object,
  id: String,
})

const { options, id } = toRefs(props)
</script>

<template>
  <div class="relative" ref="multiselect">
    <div class="absolute z-10 p-1 mt-1 overflow-y-auto bg-white border divide-y rounded shadow" :id="id">
      <div v-for="(option, idx) in options" :key="idx" @click="store.setSelectService(option)">
        <div class="flex items-center justify-between p-1 rounded cursor-pointer hover:bg-slate-100">{{ option }}<MdiCheck v-if="store.selectedServices.includes(option)" class="w-5 h-5 ml-3 text-gray-600" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
