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
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

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
    <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
      <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
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
