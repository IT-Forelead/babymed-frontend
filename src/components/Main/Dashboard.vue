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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    useExpenseStore().setDailyOperationExpenses(res)
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
  <div class="bg-white rounded-lg w-full p-3">
    <apexchart type="area" height="320" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped></style>
