<script setup>
import VisitService from '../../../services/visit.service'
import { onMounted } from 'vue'
import { useVisitStore } from '../../../store/visit.store'
import moment from 'moment'

const series = [
  {
    name: 'Tasgriflar soni',
    data: [121, 32, 70, 126, 116, 121, 113],
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
    categories: ['Dushanba', 'Seshanba', 'Choranba', 'Payanba', 'Juma', 'Shanba', 'Yakshanba'],
    labels: {
      style: {
        fontSize: '12px',
      },
    },
    tooltip: {
      enabled: true,
    },
  },
}

onMounted(() => {
  VisitService.getVisits({
    startDate: moment().startOf('isoWeek').format().toString().slice(0, 19),
    endDate: moment().endOf('isoWeek').format().toString().slice(0, 19),
  }).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setPatients(res?.data)
  })
})
</script>
<template>
  <div class="bg-white rounded-lg w-full">
    <div class="flex items-center justify-between p-5">
      <div>
        <h1 class="text-3xl font-bold">Haftalik tashriflar</h1>
        <p class="font-medium text-lg">Har bir kungi statistikasi</p>
      </div>
      <div class="flex items-end space-x-2">
        <div class="text-4xl font-bold">817</div>
        <div class="text-xl font-medium text-gray-700">ta</div>
      </div>
    </div>
    <apexchart type="bar" height="320" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
