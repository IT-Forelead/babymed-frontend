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
import moment from 'moment'

const { t } = useI18n()

const patients = ref(0)
const doctors = ref(0)

const numberOfDailyOperations = computed(() => {
  return useExpenseStore().numberOfDailyOperations
})

const numberOfMonthlyOperations = computed(() => {
  return useExpenseStore().numberOfMonthlyOperations
})

// const totalOfDailyOperations = numberOfDailyOperations.value?.map((a) => a.y).reduce((total, currentValue) => total + currentValue)

const series = computed(() => [
  {
    name: 'Operatsiyalar soni',
    data: numberOfDailyOperations.value?.map((a) => a.y),
  },
])

const chartOptions = computed(() => {
  return {
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
      categories: numberOfDailyOperations.value?.map((a) => a.x),
      labels: {
        style: {
          fontSize: '12px',
        },
        formatter: function (val) {
          return moment(val).format('D-MMM, YYYY')
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
})

// second chart
const series2 = computed(() => [
  {
    data: numberOfMonthlyOperations.value?.map((a) => a.count),
  },
])

const chartOptions2 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 380,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: '100%',
        distributed: false,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#A3E635', '#A3E635', '#111827'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#304758'],
      },
      formatter: function (val) {
        return val
      },
      offsetX: 0,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: numberOfMonthlyOperations.value?.map((a) => a.serviceName),
      // categories: ['Кесарево бирламчи', 'Кесарево иккиламчи', 'Киста', 'Лапоротомия', 'Пластика', 'Табиий тугрук', 'Экстрипация'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: function () {
            return t('numberOfOperations') + ':'
          },
        },
      },
    },
    grid: {
      show: false,
    },
  }
})

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
    useExpenseStore().clearStore()
    useExpenseStore().setNumberOfDailyOperations(res)
    ExpenseService.getNumberOfMonthlyOperations().then((res) => {
      useExpenseStore().setNumberOfMonthlyOperations(res)
    })
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
              <div class="text-lg font-bold">{{ $t('operationsStatistics') }}</div>
              <div class="text-sm">{{ $t('sevenBusinessDayStatistics') }}</div>
            </div>
            <div class="rounded-xl py-2 px-3 bg-white text-2xl font-bold text-gray-900">27</div>
          </div>
          <div class="px-1">
            <apexchart type="bar" height="180" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
        <div class="bg-white rounded-lg w-full">
          <div class="flex items-center justify-between p-5">
            <div>
              <div class="text-lg font-bold">{{ $t('operationsStatistics') }}</div>
              <div class="text-sm">{{ $t('thirtyDayStatistics') }}</div>
            </div>
            <div class="rounded-xl py-2 px-3 bg-lime-300 text-2xl font-bold text-gray-900">327</div>
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
            <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
              <RecentPatientOutlineIcon class="w-8 h-8 text-gray-900" />
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
            <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
              <MedicalDoctorIcon class="w-7 h-7 text-gray-900" />
            </div>
          </div>
          <p>{{ $t('numberOfAttendingDoctors') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
