<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useExpenseStore } from '../../store/expense.store'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import OperationExpenseService from '../../services/operationExpenses.service'
import UserService from '../../services/user.service'
import { useUserStore } from '../../store/user.store'
import SelectOptionDoctor from '../Inputs/SelectOptionDoctor.vue'
import PlusIcon from '../../assets/icons/PlusIcon.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { useDropStore } from '../../store/drop.store'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import MoneyBagIconm from '../../assets/icons/MoneyBagIcon.vue'

const { t } = useI18n()

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

const expenseItem = reactive({
  userId: '',
  subRole: '',
  price: 0,
})

const expenseForm = reactive({
  operationId: '',
  operationExpenseItems: [],
  forLaboratory: 0,
  forTools: 0,
  forDrugs: 0,
  partnerDoctorFullName: '',
  partnerDoctorPrice: '',
})

const clearForm = () => {
  expenseForm.operationId = ''
  expenseForm.operationExpenseItems = []
  expenseForm.forLaboratory = ''
  expenseForm.forTools = ''
  expenseForm.forDrugs = ''
  expenseForm.partnerDoctorFullName = ''
  expenseForm.partnerDoctorPrice = ''
  useDropStore().clearStore()
  displayItems.value = []
  expenseItem.subRole = ''
  expenseItem.price = 0
  expenseItem.userId = ''
}

onMounted(() => {
  OperationExpenseService.getOperations({}).then((res) => {
    useExpenseStore().clearStore()
    useExpenseStore().setOperations(res?.data)
  })
  UserService.getAllDoctors({
    role: 'doctor',
  }).then((res) => {
    useUserStore().clearStore()
    useUserStore().setDoctors(res?.data)
  })
  UserService.getSubRoles().then((res) => {
    useUserStore().clearStore()
    useUserStore().setSubRoles(res)
  })
})

const operations = computed(() => {
  return useExpenseStore().operations
})

const doctors = computed(() => {
  return useUserStore().doctors
})

const subRoles = computed(() => {
  return useUserStore().subRoles
})

const submitExpenseFormData = () => {
  if (!expenseForm.operationId) {
    notify.warning({
      message: t('plsSelectPatientVisit'),
    })
  } else if (expenseForm.operationExpenseItems.length < 4) {
    notify.warning({
      message: t('plsEnter'),
    })
  } else {
    OperationExpenseService.createExpense(cleanObjectEmptyFields(expenseForm))
      .then(() => {
        clearForm()
        notify.success({
          message: t('expenseCreated'),
        })
      })
      .catch((err) => {
        notify.error({
          message: t('errorExpense'),
        })
      })
  }
}

const displayItems = ref([])

const selectedDoctor = computed(() => {
  return useDropStore().selectDoctorOption
})

const addItems = () => {
  if (!useDropStore().selectDoctorOption?.id) {
    notify.warning({
      message: t('plsSelectDoctor'),
    })
  } else if (!expenseItem.subRole?.id) {
    notify.warning({
      message: t('plsSelectSubRole'),
    })
  } else {
    expenseItem.userId = useDropStore().selectDoctorOption?.id
    expenseForm.operationExpenseItems.push({
      userId: selectedDoctor?.value?.id,
      subRoleId: expenseItem.subRole?.id,
      price: expenseItem.price,
    })
    displayItems.value.push({
      doctor: selectedDoctor?.value?.firstname + ' ' + selectedDoctor?.value?.lastname,
      subRole: expenseItem.subRole?.name,
      price: expenseItem.price,
    })
    useDropStore().clearStore()
    expenseItem.subRole = ''
    expenseItem.price = 0
    expenseItem.userId = ''
  }
}
</script>
<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center space-x-3">
      <router-link to="/operation-expenses" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIconm class="w-6 h-6 mr-1" />
        {{ $t('operationExpenses') }}
      </router-link>
      <div>|</div>
      <router-link to="/operation-expenses/summary" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIconm class="w-6 h-6 mr-1" />
        {{ $t('operationExpensesReport') }}
      </router-link>
      <div>|</div>
      <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIconm class="w-6 h-6 mr-1" />
        {{ $t('addOperationExpense') }}
      </div>
    </div>
    <div class="grid grid-cols-3 mt-5 gap-5">
      <div>
        <p>{{ $t('selectVisit') }}</p>
        <select v-model="expenseForm.operationId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5">
          <option value="" selected>{{ $t('selectPatientVisit') }}</option>
          <option v-for="(operation, idx) in operations" :key="idx" :value="operation?.operation?.id" class="capitalize">
            {{ operation?.patient?.firstname + ' ' + operation?.patient?.lastname + ' | ' + operation?.service?.name }}
          </option>
        </select>
      </div>
      <div>
        <p>{{ $t('partnerDoctor') }}</p>
        <input type="text" v-model="expenseForm.partnerDoctorFullName" :placeholder="$t('enterPartnerDoctor')" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg" />
      </div>
      <div>
        <p>{{ $t('partnerDoctorPrice') }}</p>
        <money3 v-model="expenseForm.partnerDoctorPrice" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-5 mb-5">
      <div>
        <p>{{ $t('laboratoryPrice') }}</p>
        <money3 v-model="expenseForm.forLaboratory" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
      </div>
      <div>
        <p>{{ $t('toolsPrice') }}</p>
        <money3 v-model="expenseForm.forTools" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
      </div>
      <div>
        <p>{{ $t('drugsPrice') }}</p>
        <money3 v-model="expenseForm.forDrugs" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
      </div>
    </div>
    <table v-if="displayItems?.length !== 0" class="w-full bg-gray-100">
      <tr>
        <th>{{ $t('n') }}</th>
        <th>{{ $t('doctor') }}</th>
        <th>{{ $t('subRole') }}</th>
        <th>{{ $t('price') }}</th>
      </tr>
      <tr class="text-center divide-y py-5" v-for="(item, idx) in displayItems" :key="idx">
        <td>{{ idx + 1 }}</td>
        <td>{{ item?.doctor }}</td>
        <td>{{ item?.subRole }}</td>
        <td>{{ useMoneyFormatter(item?.price) }}</td>
      </tr>
    </table>
    <div class="flex items-center space-x-5 mt-3">
      <div class="basis-1/3">
        <label for="lastname">
          {{ $t('selectDoctor') }}
          <SelectOptionDoctor :options="doctors" class="flex" />
        </label>
      </div>
      <div class="basis-1/3">
        <label for="">
          {{ $t('subRole') }}
          <select v-model="expenseItem.subRole" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg">
            <option value="" selected>{{ $t('selectSubRole') }}</option>
            <option v-for="(subRole, idx) in subRoles" :key="idx" :value="subRole" class="capitalize">
              {{ subRole?.name }}
            </option>
          </select>
        </label>
      </div>
      <div class="basis-1/3">
        <label for="lastname">
          {{ $t('price') }} <br />
          <money3 v-model="expenseItem.price" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"></money3>
        </label>
      </div>
      <div class="flex-1">
        <div @click="addItems()" class="w-8 h-8 bg-lime-300 mt-5 hover:bg-lime-400 cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center rounded-full text-3xl p-1">
          <PlusIcon />
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end mt-5 space-x-5">
      <div @click="clearForm()" class="p-2 text-center text-lg text-white rounded-lg mt-3 bg-gray-400 w-1/5 hover:bg-gray-500 cursor-pointer">
        {{ $t('clear') }}
      </div>
      <div @click="submitExpenseFormData()" class="p-2 text-center text-lg text-white rounded-lg mt-3 bg-green-400 w-1/5 hover:bg-green-500 cursor-pointer">
        {{ $t('save') }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
