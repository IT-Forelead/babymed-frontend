<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useDropStore } from '../../store/drop.store'
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'

const props = defineProps({
  patients: { type: Array, required: true },
})

const { patients } = toRefs(props)

const optionClicked = (data) => {
  useDropStore().setSelectPatientOption(data)
  useDropStore().closePatientDropDown()
}
</script>

<template>
  <div v-for="(patient, idx) in patients" :key="idx" @click="optionClicked(patient)" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize">
    {{ patient?.patient?.firstname + ' ' + patient?.patient?.lastname }}
  </div>
  <div class="flex items-center justify-center w-full p-2 rounded-lg">
    <InfiniteLoading v-bind="$attrs" />
  </div>
</template>
