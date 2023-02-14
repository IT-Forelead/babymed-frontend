<script setup>
import VisitService from '../../../services/visit.service'
import { computed, onMounted } from 'vue'
import { useVisitStore } from '../../../store/visit.store'
import moment from 'moment'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const numberOfDailyVisits = computed(() => {
  return useVisitStore().numberOfDailyVisits
})

// const totalOfDailyVisits = numberOfDailyVisits.value?.map((a) => a.y).reduce((total, currentValue) => total + currentValue)

const series = computed(() => [
  {
    name: t('numberOfVisits'),
    data: numberOfDailyVisits.value?.map((a) => a.y),
  },
])

const chartOptions = computed(() => {
  return {
    chart: {
      height: 350,
      type: 'bar',
      zoom: {
        enabled: false,
      },
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#A3E635', '#A3E635', '#111827'],
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
      offsetY: -20,
      style: {
        fontSize: '14px',
        colors: ['#304758'],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: numberOfDailyVisits.value?.map((a) => a.x),
      labels: {
        style: {
          fontSize: '12px',
        },
        formatter: function (val) {
          return moment(val).format('D-MMMM')
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

onMounted(() => {
  VisitService.getVisits({
    startDate: moment().startOf('isoWeek').format().toString().slice(0, 19),
    endDate: moment().endOf('isoWeek').format().toString().slice(0, 19),
  }).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setPatients(res?.data)
    VisitService.getNumberOfDailyVisits().then((res) => {
      useVisitStore().setNumberOfDailyVisits(res)
    })
  })
})
</script>
<template>
  <div class="bg-white rounded-lg w-full">
    <div class="flex items-center justify-between p-5">
      <div>
        <h1 class="text-3xl font-bold">{{ $t('visitsStatistics') }}</h1>
        <p class="font-medium text-lg">{{ $t('sevenBusinessDayStatistics') }}</p>
      </div>
      <div class="rounded-xl p-3 bg-lime-300 text-3xl font-bold text-gray-900">715</div>
    </div>
    <apexchart type="bar" height="320" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
