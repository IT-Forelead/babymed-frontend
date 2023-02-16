<script setup>
import StatisticsSection from './Statistics/StatisticsSection.vue'
import { ref } from '@vue/reactivity'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import ExpenseService from '../../services/operationExpenses.service'
import VisitService from '../../services/visit.service'
import PatientService from '../../services/patient.service'
import UserService from '../../services/user.service'
import { onMounted, computed } from 'vue'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import { useExpenseStore } from '../../store/expense.store'
import { useVisitStore } from '../../store/visit.store'
import moment from 'moment'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import { useI18n } from 'vue-i18n'
import BigCard from './Statistics/BigCard.vue'
import RecentPatientOutlineIcon from '../../assets/icons/RecentPatientOutlineIcon.vue'
import MedicalDoctorIcon from '../../assets/icons/MedicalDoctorIcon.vue'

const { t } = useI18n()

const patients = ref(0)
const doctors = ref(0)

const numberOfDailyOperations = computed(() => {
  return useExpenseStore().numberOfDailyOperations
})

const numberOfMonthlyOperations = computed(() => {
  return useExpenseStore().numberOfMonthlyOperations
})

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
const series2 = computed(() => [
  {
    name: 'Operatsiyalar soni',
    data: numberOfDailyOperations.value?.map((a) => a.y),
  },
])

const chartOptions2 = computed(() => {
  return {
    chart: {
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

// second chart
const series3 = computed(() => [
  {
    data: numberOfMonthlyOperations.value?.map((a) => a.count),
  },
])

const chartOptions3 = computed(() => {
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
        distributed: false,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    colors: ['#A3E635'],
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
            <div class="rounded-xl py-2 px-3 bg-white text-2xl font-bold text-gray-900">27</div>
          </div>
          <div class="px-1">
            <apexchart type="bar" height="180" :options="chartOptions2" :series="series2"></apexchart>
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
            <apexchart type="bar" height="180" :options="chartOptions3" :series="series3"></apexchart>
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
