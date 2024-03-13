<script setup>
import PatientItem from '../components/Items/PatientItem.vue'
import { computed, ref, reactive } from '@vue/reactivity'
import { usePatientStore } from '../store/patient.store'
import { useModalStore } from '../store/modal.store'
import { onMounted } from 'vue'
import ArrowDownIcon from '../assets/icons/ArrowDownIcon.vue'
import FilterIcon from '../assets/icons/FilterIcon.vue'
import AddressService from '../services/address.service'
import PatientService from '../services/patient.service'
import { useAddressStore } from '../store/address.store'
import { onClickOutside } from '@vueuse/core'
import { cleanObjectEmptyFields } from '../mixins/utils'
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const isLoading = ref(false)

const total = ref(1)
const patients = computed(() => {
  return usePatientStore().patients
})
const target = ref('.patients-wrapper')
const distance = ref(0)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 10 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 10 + additional >= page) {
    PatientService.getPatients(
      cleanObjectEmptyFields({
        patientFirstName: filterData.patientFirstName ? `%${filterData.patientFirstName}%` : '',
        patientLastName: filterData.patientLastName ? `%${filterData.patientLastName}%` : '',
        regionId: filterData.regionId,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        page: page,
        limit: 10,
      })
    ).then((result) => {
      total.value = result?.total
      usePatientStore().setPatients(result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

onMounted(() => {
  usePatientStore().clearStore()
  setTimeout(() => {
    AddressService.getAllRegions().then((res) => {
      useAddressStore().setRegions(res)
    })
  }, 1000)
})

const regions = computed(() => {
  return useAddressStore().regions
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  patientFirstName: '',
  patientLastName: '',
  regionId: '',
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  PatientService.getPatients(
    cleanObjectEmptyFields({
      patientFirstName: filterData.patientFirstName ? `%${filterData.patientFirstName}%` : '',
      patientLastName: filterData.patientLastName ? `%${filterData.patientLastName}%` : '',
      regionId: filterData.regionId,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      page: 1,
      limit: 10,
    })
  ).then((res) => {
    usePatientStore().clearStore()
    total.value = res?.total
    usePatientStore().setPatients(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('patientsReport') }}</p>
      <div class="flex items-center space-x-3">
        <div class="relative" ref="dropdown">
          <div @click="useModalStore().toggleFilterBy()"
            class="border-none select-none text-gray-500 bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center hover:bg-gray-200 cursor-pointer">
            <FilterIcon class="w-5 h-5 text-gray-400" /> {{ $t('filter') }}
          </div>
          <div v-if="useModalStore().isOpenFilterBy"
            class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
            <label for="firstname">
              {{ $t('firstname') }}
              <input v-model="filterData.patientFirstName"
                class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="firstname"
                :placeholder="$t('enterFirstname')" />
            </label>
            <label for="lastname">
              {{ $t('lastname') }}
              <input v-model="filterData.patientLastName"
                class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="lastname"
                :placeholder="$t('enterLastname')" />
            </label>
            <label for="">
              <p>{{ $t('region') }}</p>
              <select v-model="filterData.regionId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                <option value="" selected>{{ $t('selectRegion') }}</option>
                <option v-for="(region, idx) in regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
              </select>
            </label>
            <div class="flex items-center space-x-1">
              <label for="">
                {{ $t('from') }}
                <input v-model="filterData.startDate" type="datetime-local"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </label>
              <ArrowDownIcon class="-rotate-90 text-gray-600 mt-6" />
              <label for="">
                {{ $t('to') }}
                <input v-model="filterData.endDate" type="datetime-local"
                  class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </label>
            </div>
            <div v-if="isLoading"
              class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
              <LoadingIcon
                class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('loading') }}</span>
            </div>
            <div v-else @click="submitFilterData()"
              class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
              <span>{{ $t('filter') }}</span>
            </div>
          </div>
        </div>
        <div @click="useModalStore().openModal()"
          class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
          <p class="text-base">+ {{ $t('addPatient') }}</p>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 patients-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('patientName') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('createdAt') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('address') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('birthday') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <PatientItem :patients="patients" :distance="distance" :target="target" @infinite="loadPatients" />
        </tbody>
      </table>
      <div v-if="patients?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>
<style scoped></style>
