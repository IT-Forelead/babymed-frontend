<script setup>
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from 'vue'
import { useExpenseStore } from '../../store/expense.store'
import { useServicesStore } from '../../store/services.store'
import { useDropStore } from '../../store/drop.store'
import ServicesService from '../../services/services.service'
import ExpenseService from '../../services/operationExpenses.service'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import SelectOptionService from '../Inputs/SelectOptionService.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

const { t } = useI18n()

const isLoading = ref(false)

const serviceTypes = computed(() => {
  return useServicesStore().serviceTypes
})

const services = computed(() => {
  return useServicesStore().services
})

onMounted(() => {
  ServicesService.getAllServiceTypes().then((res) => {
    useServicesStore().setServiceTypes(res)
  })
})

const selectedServiceType = computed(() => {
  return useDropStore().selectServiceTypeOption
})

const selectedService = computed(() => {
  return useDropStore().selectServiceOption
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

const submitOperationServiceData = () => {
  if (!selectedService.value?.id) {
    notify.warning({
      message: t('plsSelectService'),
    })
  } else {
    isLoading.value = true
    ExpenseService.createOperationService(selectedService.value?.id)
    .then(() => {
      notify.success({
        message: t('operationServiceCreated'),
      })
      ExpenseService.getAllOperationServices().then((res) => {
        useExpenseStore().clearStore()
        useExpenseStore().setOperationServices(res)
      })
      useDropStore().clearStore()
      isLoading.value = false
    })
    .catch((err) => {
      notify.error({
        message: t('errorCreatingOperationService'),
      })
    })
  }
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <p>{{ $t('selectServiceType') }}</p>
      <SelectOptionServiceType :options="serviceTypes" />
    </div>
    <div>
      <p>{{ $t('selectService') }}</p>
      <SelectOptionService :options="services" />
    </div>
    <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
      <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
      <span>{{ $t('creatingOperationService') }}</span>
    </div>
    <div v-else @click="submitOperationServiceData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
      <span>{{ $t('createOperationService') }}</span>
    </div>
  </div>
</template>
<style scoped></style>
