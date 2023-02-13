<script setup>
import BigCard from './BigCard.vue'
import PaymentIcon from '../../../assets/icons/PaymentIcon.vue'
import RecentPatientOutlineIcon from '../../../assets/icons/RecentPatientOutlineIcon.vue'
import MedicalDoctorIcon from '../../../assets/icons/MedicalDoctorIcon.vue'
import { useI18n } from 'vue-i18n'
import { computed, onMounted } from 'vue'
import PatientService from '../../../services/patient.service'
import { ref } from '@vue/reactivity'
import UserService from '../../../services/user.service'
import ExpenseService from '../../../services/operationExpenses.service'
import { useExpenseStore } from '../../../store/expense.store'

const { t } = useI18n()

const patients = ref(0)
const doctors = ref(0)
const numberOfDailyOperations = computed(() => {
  return useExpenseStore().numberOfDailyOperations
})

// const totalOfDailyOperations = numberOfDailyOperations.value?.map((a) => a.y).reduce((total, currentValue) => total + currentValue)

const series = [
  {
    name: 'Operatsiyalar soni',
    data: numberOfDailyOperations.value?.map((a) => a.y),
  },
]

const chartOptions = {
  chart: {
    height: 350,
    type: 'bar',
    events: {
      click: function (chart, w, e) {
        // console.log(chart, w, e)
      },
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#FFF', '#111827', '#FFF', '#FFF'],
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: '45%',
      distributed: true,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val
    },
    offsetY: -17,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    type: 'datetime',
    categories: numberOfDailyOperations.value?.map((a) => a.x),
    // categories: ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Yak'],
    labels: {
      style: {
        fontSize: '12px',
      },
    },
    tooltip: {
      enabled: true,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + ' ta'
      },
    },
  },
  grid: {
    show: false,
  },
}

// second chart
const series2 = [
  {
    name: t('numberOfVisits'),
    data: [21, 18, 53, 11, 34, 41, 15],
  },
]

const chartOptions2 = {
  chart: {
    height: 350,
    type: 'bar',
    events: {
      click: function (chart, w, e) {
        // console.log(chart, w, e)
      },
    },
    toolbar: {
      show: false,
    },
  },
  colors: ['#A3E635', '#111827', '#A3E635', '#A3E635'],
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: '45%',
      distributed: true,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val
    },
    offsetY: -17,
    style: {
      fontSize: '12px',
      colors: ['#304758'],
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Yak'],
    labels: {
      style: {
        fontSize: '12px',
      },
    },
    tooltip: {
      enabled: true,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        return val + ' ta'
      },
    },
  },
  grid: {
    show: false,
  },
}

onMounted(() => {
  PatientService.getAllPatients({}).then((res) => {
    patients.value = res?.total
    UserService.getAllDoctors({
      role: 'doctor',
    }).then((res) => {
      doctors.value = res?.total
    })
  })
  ExpenseService.getNumberOfDailyOperations().then((res) => {
    useExpenseStore().setNumberOfDailyOperations(res)
  })
})
</script>
<template>
  <div class="grid grid-cols-2 gap-5 mb-5">
    <BigCard />
    <div class="space-y-5">
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-lime-300 rounded-lg w-full">
          <div class="flex items-center justify-between p-5">
            <div>
              <p class="text-sm">{{ $t('sevenBusinessDayStatistics') }}</p>
              <p class="text-lg font-bold">{{ $t('operationsStatistics') }}</p>
            </div>
            <div class="flex items-end space-x-2">
              <div class="text-2xl font-bold">27</div>
              <div class="text-lg font-medium text-gray-700">ta</div>
            </div>
          </div>
          <div class="px-1">
            <apexchart type="bar" height="180" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
        <div class="bg-white rounded-lg w-full">
          <div class="flex justify-between p-5">
            <div>
              <p>Bill Due</p>
              <p class="text-2xl font-bold">1,8M+ UZS</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <PaymentIcon class="w-7 h-7" />
            </div>
          </div>
          <div class="px-1">
            <apexchart type="bar" height="180" :options="chartOptions2" :series="series2"></apexchart>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="bg-white rounded-lg w-full p-5 space-y-2">
          <div class="flex justify-between mb-3">
            <div>
              <p>{{ $t('patients') }}</p>
              <p class="text-2xl font-bold">{{ patients }}</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <RecentPatientOutlineIcon class="w-8 h-8" />
            </div>
          </div>
          <p>{{ $t('numberOfRegisteredPatients') }}</p>
        </div>
        <div class="bg-white rounded-lg w-full p-5 space-y-2">
          <div class="flex justify-between mb-3">
            <div>
              <p>{{ $t('doctors') }}</p>
              <p class="text-2xl font-bold">{{ doctors }}</p>
            </div>
            <div class="rounded-xl p-3 bg-gray-100 flex items-center justify-center">
              <MedicalDoctorIcon class="w-7 h-7" />
            </div>
          </div>
          <p>{{ $t('numberOfAttendingDoctors') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
