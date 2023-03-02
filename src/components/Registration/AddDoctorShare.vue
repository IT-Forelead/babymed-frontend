<script setup>
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from 'vue'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import { useUserStore } from '../../store/user.store'
import { useServicesStore } from '../../store/services.store'
import { useDropStore } from '../../store/drop.store'
import ServicesService from '../../services/services.service'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import SelectOptionDoctor from '../Inputs/SelectOptionDoctor.vue'
import SelectOptionServiceType from '../Inputs/SelectOptionServiceType.vue'
import SelectOptionService from '../Inputs/SelectOptionService.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

const { t } = useI18n()

const isLoading = ref(false)
const percent = ref(0)

const moneyConf = {
  suffix: ' %',
  precision: 0,
  min: 0,
  max: 100,
}

const doctors = computed(() => {
  return useUserStore().doctors
})

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

const selectedDoctor = computed(() => {
  return useDropStore().selectDoctorOption
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

const submitDoctorShareData = () => {
  if (!selectedDoctor.value?.id) {
    notify.warning({
      message: t('plsSelectDoctor'),
    })
  } else if (!selectedServiceType.value?.id) {
    notify.warning({
      message: t('plsSelectServiceType'),
    })
  } else if (!selectedService.value?.id) {
    notify.warning({
      message: t('plsSelectService'),
    })
  } else {
    isLoading.value = true
    CheckupExpenseService.createDoctorShare(
      cleanObjectEmptyFields({
        userId: selectedDoctor.value?.id,
        serviceId: selectedService.value?.id,
        percent: percent.value,
      })
    )
    .then(() => {
      notify.success({
        message: t('doctorShareCreated'),
      })
      CheckupExpenseService.getAllDocotrShares().then((res) => {
        useCheckupExpenseStore().clearStore()
        useCheckupExpenseStore().setDoctorShares(res)
      })
      useDropStore().clearStore()
      isLoading.value = false
    })
    .catch((err) => {
      notify.error({
        message: t('errorCreatingDoctorShare'),
      })
    })
  }
}
</script>

<template>
  <div class="space-y-5">
      <div>
        <p>{{ $t('selectDoctor') }}</p>
        <SelectOptionDoctor :options="doctors" />
      </div>
    <div>
      <p>{{ $t('selectServiceType') }}</p>
      <SelectOptionServiceType :options="serviceTypes" />
    </div>
    <div>
      <p>{{ $t('selectService') }}</p>
      <SelectOptionService :options="services" />
    </div>
    <div>
      <p>{{ $t('doctorShare') }}</p>
      <money3 v-model="percent" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
    </div>
    <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
      <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
      <span>{{ $t('creatingDoctorShare') }}</span>
    </div>
    <div v-else @click="submitDoctorShareData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
      <span>{{ $t('createDoctorShare') }}</span>
    </div>
  </div>
</template>
<style scoped></style>
