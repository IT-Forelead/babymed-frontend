<script setup>
import { computed, reactive } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useVisitStore } from '../../store/visit.store'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import VisitService from '../../services/visit.service'
import ExpenseService from '../../services/expenses.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const expenseForm = reactive({
  patientVisitId: '',
  operationExpenseItems: [],
  forLaboratory: '',
  forTools: '',
  forDrugs: '',
  partnerDoctorFullName: '',
  partnerDoctorPrice: '',
})

const clearForm = () => {
  expenseForm.patientVisitId = ''
  expenseForm.operationExpenseItems = []
  expenseForm.forLaboratory = ''
  expenseForm.forTools = ''
  expenseForm.forDrugs = ''
  expenseForm.partnerDoctorFullName = ''
  expenseForm.partnerDoctorPrice = ''
}

onMounted(() => {
  VisitService.getAllVisits({}).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setPatients(res?.data)
  })
})

const visits = computed(() => {
  return useVisitStore().patients
})

const submitExpenseData = () => {
  if (!expenseForm.patientVisitId) {
    notify.warning({
      message: 'Please select patient visit!',
    })
    // } else if (!expenseForm.operationExpenseItems) {
    //   notify.warning({
    //     message: t('plsEnterPatientLastname'),
    //   })
    // } else if (!patientForm.birthday) {
    //   notify.warning({
    //     message: t('plsEnterPatientBirthday'),
    //   })
    // } else if (!patientForm.phone) {
    //   notify.warning({
    //     message: t('plsEnterPatientPhone'),
    //   })
    // } else if (!patientForm.regionId) {
    //   notify.warning({
    //     message: t('plsSelectRegion'),
    //   })
    // } else if (!patientForm.cityId) {
    //   notify.warning({
    //     message: t('plsSelectTown'),
    //   })
  } else {
    ExpenseService.createExpense(cleanObjectEmptyFields(expenseForm))
      .then(() => {
        clearForm()
        notify.success({
          message: 'Expense succesfully created!',
        })
      })
      .catch((err) => {
        notify.error({
          message: 'Error while creating expense',
        })
      })
  }
}
</script>
<template>
  <div class="grid gap-10 grid-cols-2 my-5">
    <div>
      <p>Select visit</p>
      <select v-model="expenseForm.patientVisitId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
        <option value="" selected>Select Patient Visit</option>
        <option v-for="(visit, idx) in visits" :key="idx" :value="visit?.patientVisit?.id" class="capitalize">
          {{ visit?.patient?.firstname + ' ' + visit?.patient?.lastname + ' | ' + visit?.service?.name }}
        </option>
      </select>
      <!-- <label for="lastname">
        {{ $t('lastname') }}
        <input v-model="patientForm.lastname" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="lastname" :placeholder="$t('enterLastname')" />
      </label>
      <label for="birthday">
        {{ $t('birthday') }}
        <input v-model="patientForm.birthday" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="date" id="birthday" :placeholder="$t('birthday')" />
      </label>
      <label for="phone">
        {{ $t('phone') }}
        <input v-model="patientForm.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" v-mask="'+998(##) ###-##-##'" placeholder="+998(00) 000-00-00" />
      </label> -->
    </div>
    <div>
      <!-- <p>{{ $t('region') }}</p>
      <select v-model="patientForm.regionId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
        <option value="" selected>{{ $t('selectRegion') }}</option>
        <option v-for="(region, idx) in regions" :key="idx" :value="region?.id">{{ region?.name }}</option>
      </select>
      <div v-if="patientForm.regionId !== ''">
        <p>City</p>
        <select v-model="patientForm.cityId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
          <option value="" selected>{{ $t('selectTown') }}</option>
          <option v-for="(city, idx) in cities" :key="idx" :value="city?.id">{{ city?.name }}</option>
        </select>
      </div>
      <label v-if="patientForm.cityId !== ''" for="address">
        {{ $t('address') }}
        <input v-model="patientForm.address" id="address" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" :placeholder="$t('enterAddress')" />
      </label> -->
    </div>
  </div>
</template>

<style scoped></style>
