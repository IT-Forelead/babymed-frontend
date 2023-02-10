<script setup>
import StatisticsSection from './Statistics/StatisticsSection.vue'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import ExpenseService from '../../services/operationExpenses.service'
import VisitService from '../../services/visit.service'
import { onMounted, computed } from 'vue'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import { useExpenseStore } from '../../store/expense.store'
import { useVisitStore } from '../../store/visit.store'
import moment from 'moment'
import useMoneyFormatter from '../../mixins/currencyFormatter'

const series = computed(() => [
  {
    name: 'Incoming profit',
    data: useVisitStore().dailyProfit,
  },
  {
    name: 'Operation expense',
    data: useExpenseStore().dailyOperationExpenses,
  },
  {
    name: 'Checkup expense',
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
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: 'Input and output cost statistics',
    align: 'left',
    style: {
      fontSize: '14px',
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
      show: false,
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
    x: {
      format: 'dd MMM yyyy',
    },
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

onMounted(() => {
  CheckupExpenseService.getDailyCheckupExpenses({
    startDate: moment().subtract(30, 'days').startOf('day').format().toString().slice(0, 19),
    // endDate: moment().endOf('isoWeek').format().toString().slice(0, 19),
  }).then((res) => {
    useCheckupExpenseStore().clearStore()
    useCheckupExpenseStore().setDailyCheckupExpenses(res)
  })
  ExpenseService.getDailyOperationExpenses({
    startDate: moment().subtract(30, 'days').startOf('day').format().toString().slice(0, 19),
    // endDate: moment().endOf('isoWeek').format().toString().slice(0, 19),
  }).then((res) => {
    useExpenseStore().clearStore()
    useExpenseStore().setOperationExpenses(res)
  })
  VisitService.getDailyProfit({
    startDate: moment().subtract(30, 'days').startOf('day').format().toString().slice(0, 19),
    // endDate: moment().endOf('isoWeek').format().toString().slice(0, 19),
  }).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setDailyProfit(res)
  })
})
</script>

<template>
  <StatisticsSection />
  <div class="bg-white rounded-lg w-full p-5">
    <apexchart type="area" height="320" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped></style>
