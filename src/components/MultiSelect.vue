<script setup>
import { ref, toRefs } from 'vue'
import MdiCheck from '../assets/icons/MdiCheck.vue'
import { useMultiSelectStore } from '../store/multiselect.store'
import { onClickOutside } from '@vueuse/core'
import { useDropStore } from '../store/drop.store';

const store = useMultiSelectStore()

const multiselect = ref(null)

const props = defineProps({
  options: Object,
  id: String,
})

const { options, id } = toRefs(props)

onClickOutside(multiselect, () => {
  useDropStore().closeServiceDropDown()
})
</script>

<template>
  <div class="relative" ref="multiselect">
    <div class="absolute z-10 overflow-y-auto bg-gray-100 border w-full mt-2 p-1 rounded-lg divide-y shadow" :id="id">
      <div v-for="(option, idx) in options" :key="idx" @click="store.setSelectService(option)">
        <div class="flex items-center justify-between p-1 rounded cursor-pointer hover:bg-slate-200">
          {{ option?.name }}
          <MdiCheck v-if="store.selectedServices.includes(option)" class="w-5 h-5 ml-3 text-gray-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
