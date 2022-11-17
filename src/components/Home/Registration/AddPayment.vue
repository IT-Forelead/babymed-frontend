<script setup>
import { computed, ref } from '@vue/reactivity'
import { useDropStore } from '../../../store/drop.store'
import { usePatientStore } from '../../../store/patient.store'
import { onMounted } from 'vue'
import PaymentService from '../../../services/payment.service'
import PatientService from '../../../services/patient.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { usePaymentStore } from '../../../store/payment.store'
import { useI18n } from 'vue-i18n'
import SelectOption from '../../SelectOptionPatient.vue'

const { t } = useI18n()
const sum = ref(0)
const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const clearSelectedPatientData = () => {
  useDropStore().setSelectOption('')
  sum.value = ''
}

const submitPaymentData = (sp_id) => {
  if (!sp_id) {
    notify.warning({
      message: t('plsSelectPatient'),
    })
  } else if (sum.value == 0) {
    notify.warning({
      message: t('plsEnterPaymentAmount'),
    })
  } else {
    PaymentService.createPayment({
      patientId: sp_id,
      price: sum.value,
    })
      .then(() => {
        notify.success({
          message: t('paymentCreated'),
        })
        clearSelectedPatientData()
        PaymentService.getPayments({})
          .then((res) => {
            usePaymentStore().clearStore()
            setTimeout(() => {
              usePaymentStore().setPayments(res?.data)
            }, 500)
          })
      })
      .catch(() => {
        notify.error({
          message: t('errorCreatingPayment'),
        })
      })
  }
}

const patients = computed(() => {
  return usePatientStore().patients
})

onMounted(() => {
  PatientService.getPatients({})
    .then((res) => {
      usePatientStore().clearStore()
      setTimeout(() => {
        usePatientStore().setPatients(res?.data)
      }, 500)
    })
    .catch((err) => {
      console.log('ERR', err)
    })
})
</script>
<template>
  <div class="select-none">
    <h1 class="text-lg">{{ $t('patient') }}</h1>
    <SelectOption :options="patients" :where-to-use="'payment'"/>
    <h1 class="text-lg">{{ $t('paymentAmount') }}</h1>
    <label class="flex items-center w-full relative my-3">
      <money3 v-model="sum" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
    </label>
    <hr class="my-3" />
    <div @click="submitPaymentData(selectedPatient?.patient?.id)" class="rounded-lg bg-blue-600 p-3 text-white text-center cursor-pointer hover:bg-blue-800">{{ $t('savePayment') }}</div>
  </div>
</template>
