<script setup>
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import PlusIcon from '../../assets/icons/PlusIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { onMounted, ref, toRefs } from 'vue'
import moment from 'moment'
import { parseJwt } from '../../mixins/utils.js'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../../store/patient.store'
import { useModalStore } from '../../store/modal.store'
import { useDropStore } from '../../store/drop.store'

const router = useRouter()
const payload = ref({})

const props = defineProps({
  patients: { type: Array, required: true },
})

const { patients } = toRefs(props)

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const addVisitThisPatient = (patient) => {
  useDropStore().setSelectPatientOption(patient)
  useModalStore().openAddVisitModal()
}

const deletePatient = (selectedPatient) => {
  useModalStore().openDeleteAlertModal()
  usePatientStore().setSelectedPatient(selectedPatient)
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(patient, idx) in patients" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <span class="text-lg font-medium capitalize">{{ patient?.patient?.firstname + ' ' + patient?.patient?.lastname }}</span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ patient?.patient?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ moment(patient?.patient?.createdAt).format('DD/MM/YYYY H:mm') }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      {{ patient?.region?.name }} <br />
      {{ patient?.city?.name }} <br />
      {{ patient?.patient?.address }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      {{ moment(patient?.patient?.birthday).format('DD/MM/YYYY') }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div v-if="router.currentRoute?.value?.path === '/patients'" @click="addVisitThisPatient(patient)" class="w-4 mr-2 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <PlusIcon class="w-6 h-6" />
        </div>
        <div v-if="router.currentRoute?.value?.path === '/patients' && navigationGuard(['super_manager', 'tech_admin'])" @click="deletePatient(patient)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
