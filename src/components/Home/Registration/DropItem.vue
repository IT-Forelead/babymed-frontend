<script setup>
import { reactive } from '@vue/reactivity'
import { toRefs } from 'vue'
import { useDropStore } from '../../../store/drop.store'
const props = defineProps({
  patients: { type: Array, required: true },
})

const { patients } = toRefs(props)

const paritentClicked = (data) => {
  useDropStore().setSelectPatient(data)
  useDropStore().closeDropDown()
}
</script>
<template>
  <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(patient, idx) in patients" :key="idx" @click="paritentClicked(patient?.customer?.id)">
    {{ patient?.customer?.firstname + ' ' + patient?.customer?.lastname }}
  </div>
</template>
