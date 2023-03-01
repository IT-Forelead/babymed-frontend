<script setup>
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from 'vue'
import { useVisitStore } from '../../store/visit.store'
import { usePatientStore } from '../../store/patient.store'
import { useServicesStore } from '../../store/services.store'
import { useDropStore } from '../../store/drop.store'
import ServicesService from '../../services/services.service'
import PatientService from '../../services/patient.service'
import VisitService from '../../services/visit.service'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import SelectOptionPatient from '../Inputs/SelectOptionPatient.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useRouter } from 'vue-router'
import { useModalStore } from '../../store/modal.store'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import MultiSelect from '../Inputs/MultiSelect.vue'
import { useMultiSelectStore } from '../../store/multiselect.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import PlusIcon from '../../assets/icons/PlusIcon.vue'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'

const { t } = useI18n()

const router = useRouter()

const isLoading = ref(false)

const countConf = {
  precision: 0,
  min: 0,
  max: 30,
}

const patients = computed(() => {
  return usePatientStore().patients
})

const serviceTypes = computed(() => {
  return useServicesStore().serviceTypes
})

const services = computed(() => {
  return useServicesStore().services
})

onMounted(() => {
  useMultiSelectStore().clearStore()
  ServicesService.getAllServiceTypes().then((res) => {
    useServicesStore().setServiceTypes(res)
  })
  if (!(router.currentRoute?.value?.path === '/patients' || router.currentRoute?.value?.path === '/dashboard')) {
    PatientService.getPatients({}).then((res) => {
      useDropStore().clearStore()
      usePatientStore().clearStore()
      usePatientStore().setPatients(res?.data)
    })
  }
})

const selectedPatient = computed(() => {
  return useDropStore().selectPatientOption
})

const selectedServiceType = computed(() => {
  return useDropStore().selectServiceTypeOption
})

watch(
  () => selectedServiceType.value,
  (data) => {
    if (data) {
      ServicesService.getServicesByTypeId(data?.id).then((res) => {
        useServicesStore().setServices(res)
      })
    }
  }
)

const displayItems = ref([])
const serviceIds = ref([])
const itemCount = ref(1)

const addItems = () => {
  if (!selectedServiceType.value?.id) {
    notify.warning({
      message: t('plsSelectServiceType'),
    })
  } else if (useMultiSelectStore().selectedServices.length === 0) {
    notify.warning({
      message: t('plsSelectService'),
    })
  } else {
    if (itemCount.value > 1) {
      for (let i = 0; i < itemCount.value; i++){
        displayItems.value.push({
          serviceType: selectedServiceType?.value?.name,
          services: useMultiSelectStore().selectedServices,
        })
        serviceIds.value.push(...useMultiSelectStore().selectedServices.map(s => s?.id))
      }
      clearMultiSelectData()
      useDropStore().setSelectServiceTypeOption('')
      itemCount.value = 1
    } else {
      displayItems.value.push({
        serviceType: selectedServiceType?.value?.name,
        services: useMultiSelectStore().selectedServices,
      })
      serviceIds.value.push(...useMultiSelectStore().selectedServices.map(s => s?.id))
      clearMultiSelectData()
      useDropStore().setSelectServiceTypeOption('')
      itemCount.value = 1
    }
  }
}

const clearMultiSelectData = () => {
  useMultiSelectStore().clearStore()
  useDropStore().closeServiceDropDown()
}

const submitVisitData = () => {
  if (!selectedPatient.value?.patient?.id) {
    notify.warning({
      message: t('plsSelectPatient'),
    })
  } else if (serviceIds.value.length === 0) {
    notify.warning({
      message: t('plsSelectService'),
    })
  } else {
    isLoading.value = true
    VisitService.createVisit(
      cleanObjectEmptyFields({
        patientId: selectedPatient.value?.patient?.id,
        serviceIds: serviceIds.value,
      })
    )
      .then(() => {
        notify.success({
          message: t('createdVisit'),
        })
        VisitService.getVisits({}).then((res) => {
          useVisitStore().clearStore()
          useVisitStore().setPatients(res?.data)
        })
        useModalStore().closeAddVisitModal()
        useDropStore().clearStore()
        useMultiSelectStore().clearStore()
        isLoading.value = false
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingVisit'),
        })
      })
  }
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <p>{{ $t('selectPatient') }}</p>
      <SelectOptionPatient :options="patients" />
    </div>
    <div>
      <p>{{ $t('selectServiceType') }}</p>
      <SelectOptionServiceType :options="serviceTypes" />
    </div>
    <div>
      <p>{{ $t('selectService') }}</p>
      <label class="flex items-center w-full relative">
        <div v-if="!(useMultiSelectStore().selectedServices.length === 0)" @click="useDropStore().openServiceDropDown()"
          class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2"
          v-text="useMultiSelectStore().selectedServices.map((s) => s?.name).join(', ')"></div>
        <div @click="useDropStore().openServiceDropDown()" v-if="!useDropStore().isOpenServiceDropDown && useMultiSelectStore().selectedServices.length === 0"
          class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{
            $t('select')
          }}</div>
        <ChevronRightIcon @click="useDropStore().openServiceDropDown()"
          v-if="useMultiSelectStore().selectedServices.length === 0 && !useDropStore().isOpenServiceDropDown"
          class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
        <TimesIcon @click="clearMultiSelectData()" v-if="!(useMultiSelectStore().selectedServices.length === 0)"
          class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
        <div v-if="useDropStore().isOpenServiceDropDown"
          class="absolute shadow z-20 top-12 max-h-48 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
          <div v-if="useServicesStore().services.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
            <p class="text-red-500">{{ $t('serviceNotFound') }}</p>
          </div>
        </div>
      </label>
      <MultiSelect v-if="useDropStore().isOpenServiceDropDown" :id="'services'" :options="services" />
    </div>
    <div v-if="!(useMultiSelectStore().selectedServices.length > 1)">
      <p>Count</p>
      <money3 v-model="itemCount" v-bind="countConf" class="border-none text-left text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
    </div>
    <div class="flex justify-center">
      <div @click="addItems()"
        class="w-10 h-10 bg-lime-300 hover:bg-lime-400 cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-full text-3xl p-1">
        <PlusIcon />
      </div>
    </div>
    <table v-if="displayItems?.length !== 0" class="w-full bg-gray-100">
      <tr>
        <th>{{ $t('n') }}</th>
        <th>{{ $t('serviceType') }}</th>
        <th>{{ $t('services') }}</th>
      </tr>
      <tr class="text-center divide-y py-5" v-for="(item, idx) in displayItems" :key="idx">
        <td>{{ idx + 1 }}</td>
        <td>{{ item?.serviceType }}</td>
        <td>
          <div v-for="(s, idx) in item?.services" :key="idx">
            {{ s.name }}
          </div>
        </td>
      </tr>
    </table>
    <div v-if="isLoading"
      class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
      <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill" />
      </svg>
      <span>{{ $t('creatingVisit') }}</span>
    </div>
    <div v-else @click="submitVisitData()"
      class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
      <span>{{ $t('createVisit') }}</span>
    </div>
  </div>
</template>
<style scoped>

</style>
