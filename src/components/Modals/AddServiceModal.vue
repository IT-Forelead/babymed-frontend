<script setup>
import { useModalStore } from '../../store/modal.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import { useI18n } from 'vue-i18n'
import { reactive, ref } from '@vue/reactivity'
import { computed } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDropStore } from '../../store/drop.store'
import { useServicesStore } from '../../store/services.store'
import ServicesService from '../../services/services.service'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

const { t } = useI18n()

const isLoading = ref(false)

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const serviceData = reactive({
  name: '',
  price: 0,
})

const clearFields = () => {
  serviceData.name = ''
  serviceData.price = 0
  useDropStore().setSelectServiceTypeOption('')
}

const getServices = () => {
  ServicesService.getAllServices().then((res) => {
    useServicesStore().setAllServices(res)
  })
  ServicesService.getAllServiceTypes().then((res) => {
    useServicesStore().setServiceTypes(res)
  })
}

const submitServiceData = () => {
  if (!serviceData.name) {
    notify.warning({
      message: t('plsEnterServiceName'),
    })
  } else if (!selectedServiceType.value?.id) {
    notify.warning({
      message: 'Please select service type!',
    })
  } else if (serviceData.price == 0) {
    notify.warning({
      message: t('plsEnterServicePrice'),
    })
  } else {
    isLoading.value = true
    ServicesService.createService(
      cleanObjectEmptyFields({
        serviceTypeId: selectedServiceType.value?.id,
        name: serviceData.name,
        price: serviceData.price,
      })
    )
    .then(() => {
      notify.success({
        message: t('serviceCreated'),
      })
      getServices()
      clearFields()
      useModalStore().closeAddServiceModal()
      isLoading.value = false
    })
    .catch(() => {
      notify.warning({
        message: t('errorCreatingService'),
      })
      setTimeout(() => {
        isLoading.value = false
      }, 3000)
    })
  }
}

const selectedServiceType = computed(() => {
  return useDropStore().selectServiceTypeOption
})

const serviceTypes = computed(() => {
  return useServicesStore().serviceTypes
})
</script>

<template>
  <div v-if="useModalStore().isOpenAddServiceModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div class="text-xl font-medium">{{ $t('createService') }}</div>
          </div>
          <button @click="useModalStore().closeAddServiceModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-4 space-y-5">
          <label for="serviceName">
            {{ $t('serviceName') }}
            <input v-model="serviceData.name" class="text-gray-500 mb-3 border-none bg-gray-100 rounded-lg w-full text-lg" type="text" id="serviceName" :placeholder="$t('enterServiceName')" />
          </label>
          <label for="">
            {{ $t('serviceType') }}
            <SelectOptionServiceType :options="serviceTypes" class="mb-3" />
          </label>
          <label for="servicePrice">
            {{ $t('servicePrice') }}
            <money3 v-model="serviceData.price" v-bind="moneyConf" id="servicePrice" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
          </label>
          <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
            <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ t('creatingService') }}</span>
          </div>
          <div v-else @click="submitServiceData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
            <span>{{ t('createService') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
