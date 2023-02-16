<script setup>
import { ref } from '@vue/reactivity'
import moment from 'moment'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ChartBarHorizontalIcon from '../../assets/icons/ChartBarHorizontalIcon.vue'
import ChartBarIcon from '../../assets/icons/ChartBarIcon.vue'
import MedicalDoctorIcon from '../../assets/icons/MedicalDoctorIcon.vue'
import RecentPatientOutlineIcon from '../../assets/icons/RecentPatientOutlineIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import ExpenseService from '../../services/operationExpenses.service'
import PatientService from '../../services/patient.service'
import UserService from '../../services/user.service'
import VisitService from '../../services/visit.service'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import { useExpenseStore } from '../../store/expense.store'
import { useVisitStore } from '../../store/visit.store'
import BigCard from './Statistics/BigCard.vue'

const { t } = useI18n()

const patients = ref(0)
const doctors = ref(0)

const numberOfDailyOperations = computed(() => {
  return useExpenseStore().numberOfDailyOperations
})

const numberOfMonthlyOperations = computed(() => {
  return useExpenseStore().numberOfMonthlyOperations
})

//Expenses Chart
const series = computed(() => [
  {
    name: t('incomingProfit'),
    data: useVisitStore().dailyProfit,
  },
  {
    name: t('operationExpense'),
    data: useExpenseStore().dailyOperationExpenses,
  },
  {
    name: t('checkupExpense'),
    data: useCheckupExpenseStore().dailyCheckupExpenses,
  },
])

const chartOptions = {
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: t('inputAndOutputCostStatistics'),
    align: 'left',
    style: {
      fontSize: '18px',
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tickAmount: 6,
    floating: false,
    labels: {
      show: true,
      formatter: function (val) {
        return useMoneyFormatter(val)
      },
      style: {
        colors: '#8e8da4',
      },
      offsetY: 0,
      offsetX: 0,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
  },
  fill: {
    opacity: 0.5,
  },
  tooltip: {
    fixed: {
      enabled: false,
      position: 'topRight',
    },
  },
  grid: {
    yaxis: {
      lines: {
        offsetX: -30,
      },
    },
    padding: {
      left: 20,
    },
  },
}

// Daily Operations Chart
const numberOfDailyOperationsSeries = computed(() => [
  {
    name: 'Operatsiyalar soni',
    data: numberOfDailyOperations.value?.map((a) => a.y),
  },
])

const numberOfDailyOperationsChartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
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
          position: 'top',
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
          return moment(val).format('D-MMM')
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
          return val
        },
      },
    },
    grid: {
      show: false,
    },
  }
})

// Monthly Operations Chart
const numberOfMonthlyOperationsSeries = computed(() => [
  {
    data: numberOfMonthlyOperations.value?.map((a) => a.count),
  },
])

const numberOfMonthlyOperationsChartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#A3E635', '#111827', '#A3E635', '#A3E635'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#111827', '#fff', '#111827', '#111827'],
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
  CheckupExpenseService.getDailyCheckupExpenses({
    startDate: moment().subtract(30, 'days').startOf('day').format().toString().slice(0, 19),
  }).then((res) => {
    useCheckupExpenseStore().clearStore()
    useCheckupExpenseStore().setDailyCheckupExpenses(res)
  })
  ExpenseService.getDailyOperationExpenses({
    startDate: moment().subtract(30, 'days').startOf('day').format().toString().slice(0, 19),
  }).then((res) => {
    useExpenseStore().clearStore()
    useExpenseStore().setDailyOperationExpenses(res)
    ExpenseService.getNumberOfDailyOperations().then((res) => {
      useExpenseStore().setNumberOfDailyOperations(res)
    })
    ExpenseService.getNumberOfMonthlyOperations().then((res) => {
      useExpenseStore().setNumberOfMonthlyOperations(res)
    })
  })
  VisitService.getDailyProfit({
    startDate: moment().subtract(30, 'days').startOf('day').format().toString().slice(0, 19),
  }).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setDailyProfit(res)
  })
  PatientService.getAllPatients({}).then((res) => {
    patients.value = res?.total
    UserService.getAllDoctors({
      role: 'doctor',
    }).then((res) => {
      doctors.value = res?.total
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
            <div class="rounded-xl p-3 bg-white flex items-center justify-center">
              <ChartBarIcon class="w-7 h-7 text-gray-900" />
            </div>
          </div>
          <div class="px-1">
            <apexchart type="bar" height="180" :options="numberOfDailyOperationsChartOptions" :series="numberOfDailyOperationsSeries"></apexchart>
          </div>
        </div>
        <div class="bg-white rounded-lg w-full">
          <div class="flex items-center justify-between p-5">
            <div>
              <div class="text-lg font-bold">{{ $t('operationsStatistics') }}</div>
              <div class="text-sm">{{ $t('thirtyDayStatistics') }}</div>
            </div>
            <div class="rounded-xl p-3 bg-lime-300 flex items-center justify-center">
              <ChartBarHorizontalIcon class="w-7 h-7 text-gray-900" />
            </div>
          </div>
          <div class="px-1">
            <apexchart type="bar" height="180" :options="numberOfMonthlyOperationsChartOptions" :series="numberOfMonthlyOperationsSeries"></apexchart>
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
  <div class="bg-white rounded-lg w-full p-3">
    <apexchart type="area" height="320" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped></style>
