<script setup>
import authHeader from '../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { useVisitStore } from '../store/visit.store'
import { onMounted } from 'vue'
import { useModalStore } from '../store/modal.store'
import { useUserStore } from '../store/user.store'
import { usePatientStore } from '../store/patient.store'
import { useServicesStore } from '../store/services.store'
import { useDropStore } from '../store/drop.store'
import UserService from '../services/user.service'
import ServicesService from '../services/services.service'
import PatientService from '../services/patient.service'
import VisitService from '../services/visit.service'
import SelectOptionService from '../components/SelectOptionService.vue'
import SelectOptionPatient from '../components/SelectOptionPatient.vue'
import SelectOptionDoctor from '../components/SelectOptionDoctor.vue'
import VisitsReportItem from '../components/VisitsReportItem.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const API_URL = import.meta.env.VITE_BASE_URL

const total = ref(1)

const isLoading = ref(false)

const visits = computed(() => {
  return useVisitStore().patients
})

const patients = computed(() => {
  return usePatientStore().patients
})

const doctors = computed(() => {
  return useUserStore().doctors
})

const services = computed(() => {
  return useServicesStore().services
})

const target = ref('.patients-wrapper')
const distance = ref(200)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 30 == 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    try {
      const response = await fetch(`${API_URL}/visit/report?page=${page}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json?.total
      setTimeout(() => {
        useVisitStore().setPatients(json?.data)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

onMounted(() => {
  useVisitStore().clearStore()
  UserService.getAllDoctors({
    role: 'doctor',
  }).then((res) => {
    useUserStore().setDoctors(res?.data)
  })
  ServicesService.getAllServices().then((res) => {
    useServicesStore().setServices(res)
  })
  PatientService.getAllPatients({}).then((res) => {
    usePatientStore().setPatients(res?.data)
  })
})

const selectedPatient = computed(() => {
  return useDropStore().selectPatientOption
})

const selectedDoctor = computed(() => {
  return useDropStore().selectDoctorOption
})

const selectedService = computed(() => {
  return useDropStore().selectServiceOption
})

const submitVisitData = () => {
  if (!selectedPatient.value?.patient?.id) {
    notify.warning({
      message: 'Please select patient!',
    })
  } else if (!selectedDoctor.value?.id) {
    notify.warning({
      message: 'Please select doctor!',
    })
  } else if (!selectedService.value?.id) {
    notify.warning({
      message: 'Please select service!',
    })
  } else {
    isLoading.value = true
    VisitService.createVisit({
      patientId: selectedPatient.value?.patient?.id,
      userId: selectedDoctor.value?.id,
      serviceId: selectedService.value?.id,
    })
      .then(() => {
        notify.success({
          message: 'Visit successfully created!',
        })
        useDropStore().clearStore()
        isLoading.value = false
      })
      .catch((err) => {
        notify.error({
          message: 'Error while creating visit!',
        })
      })
  }
}
</script>

<template>
  <div class="bg-white rounded-lg w-full p-3">
    <!-- <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('patientsReport') }}</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
    </div> -->
    <div class="grid grid-cols-3 gap-3 divide-x">
      <div>
        <div class="flex items-center justify-between">
          <p class="text-3xl font-bold">Add Visits</p>
          <div @click="useModalStore().openModal()" class="bg-black mt-3 text-white rounded-xl p-2.5 px-4 cursor-pointer hover:bg-black/75">
            <p class="text-base">+ {{ $t('addPatient') }}</p>
          </div>
        </div>
        <div class="space-y-5">
          <div>
            <p>{{ $t('selectPatient') }}</p>
            <SelectOptionPatient :options="patients" />
          </div>
          <div>
            <p>{{ $t('selectDoctor') }}</p>
            <SelectOptionDoctor :options="doctors" />
          </div>
          <div>
            <p>{{ $t('selectService') }}</p>
            <SelectOptionService :options="services" />
          </div>
          <div @click="submitVisitData()" :class="isLoading ? 'bg-gray-600' : 'bg-gray-900 hover:bg-gray-800 cursor-pointer'" class="w-full py-3 text-white rounded-lg flex items-center justify-center">
            <svg v-if="isLoading" class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>{{ isLoading ? 'Saving Vist' : 'Save Visit' }}</span>
          </div>
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto mt-3 patients-wrapper col-span-2">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
              <th class="py-3 px-6 text-left">{{ $t('patientName') }}</th>
              <th class="py-3 px-6 text-left">{{ $t('phone') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('createdAt') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('address') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('birthday') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <VisitsReportItem :patients="visits" :distance="distance" :target="target" @infinite="loadPatients" />
          </tbody>
        </table>
        <div v-if="patients.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
