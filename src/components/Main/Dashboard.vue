<script setup>
import StatisticsSection from './Statistics/StatisticsSection.vue'

const series = [
  {
    name: 'Incoming profit',
    data: [
      {
        x: '2023-02-01',
        y: 322000,
      },
      {
        x: '2023-02-02',
        y: 424000,
      },
      {
        x: '2023-02-03',
        y: 742000,
      },
      {
        x: '2023-02-04',
        y: 348000,
      },
      {
        x: '2023-02-05',
        y: 634000,
      },
      {
        x: '2023-02-06',
        y: 725000,
      },
      {
        x: '2023-02-07',
        y: 816000,
      },
      {
        x: '2023-02-08',
        y: 918000,
      },
      {
        x: '2023-02-09',
        y: 730000,
      },
      {
        x: '2023-02-10',
        y: 655000,
      },
      {
        x: '2023-02-11',
        y: 566000,
      },
      {
        x: '2023-02-12',
        y: 737000,
      },
      {
        x: '2023-02-13',
        y: 952000,
      },
      {
        x: '2023-02-14',
        y: 1377000,
      },
      {
        x: '2023-02-15',
        y: 1183000,
      },
      {
        x: '2023-02-16',
        y: 1344000,
      },
      {
        x: '2023-02-17',
        y: 1166000,
      },
      {
        x: '2023-02-18',
        y: 1089000,
      },
      {
        x: '2023-02-19',
        y: 1334000,
      },
    ],
  },
  {
    name: 'Operation expense',
    data: [
      {
        x: '2023-02-01',
        y: 262000,
      },
      {
        x: '2023-02-02',
        y: 190000,
      },
      {
        x: '2023-02-03',
        y: 150000,
      },
      {
        x: '2023-02-04',
        y: 277000,
      },
      {
        x: '2023-02-05',
        y: 435000,
      },
      {
        x: '2023-02-06',
        y: 345000,
      },
      {
        x: '2023-02-07',
        y: 488000,
      },
      {
        x: '2023-02-08',
        y: 320000,
      },
      {
        x: '2023-02-09',
        y: 456000,
      },
      {
        x: '2023-02-10',
        y: 123000,
      },
      {
        x: '2023-02-11',
        y: 188000,
      },
      {
        x: '2023-02-12',
        y: 366000,
      },
      {
        x: '2023-02-13',
        y: 245000,
      },
      {
        x: '2023-02-14',
        y: 429000,
      },
      {
        x: '2023-02-15',
        y: 545000,
      },
      {
        x: '2023-02-16',
        y: 288000,
      },
      {
        x: '2023-02-17',
        y: 232000,
      },
      {
        x: '2023-02-18',
        y: 346000,
      },
      {
        x: '2023-02-19',
        y: 469000,
      },
    ],
  },
  {
    name: 'Checkup expense',
    data: [
      {
        x: '2023-02-01',
        y: 162000,
      },
      {
        x: '2023-02-02',
        y: 90000,
      },
      {
        x: '2023-02-03',
        y: 50000,
      },
      {
        x: '2023-02-04',
        y: 377000,
      },
      {
        x: '2023-02-05',
        y: 335000,
      },
      {
        x: '2023-02-06',
        y: 245000,
      },
      {
        x: '2023-02-07',
        y: 388000,
      },
      {
        x: '2023-02-08',
        y: 420000,
      },
      {
        x: '2023-02-09',
        y: 356000,
      },
      {
        x: '2023-02-10',
        y: 223000,
      },
      {
        x: '2023-02-11',
        y: 388000,
      },
      {
        x: '2023-02-12',
        y: 466000,
      },
      {
        x: '2023-02-13',
        y: 345000,
      },
      {
        x: '2023-02-14',
        y: 329000,
      },
      {
        x: '2023-02-15',
        y: 445000,
      },
      {
        x: '2023-02-16',
        y: 388000,
      },
      {
        x: '2023-02-17',
        y: 432000,
      },
      {
        x: '2023-02-18',
        y: 546000,
      },
      {
        x: '2023-02-19',
        y: 669000,
      },
    ],
  },
]
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
</script>

<template>
  <StatisticsSection />
  <div class="bg-white rounded-lg w-full p-5">
    <apexchart type="area" height="320" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped></style>
