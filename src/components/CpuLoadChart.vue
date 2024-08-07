<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import { type CpuLoadPoint } from '@/types/cpuLoadData'
import { TIME_INTERVAL, WINDOW_HISTORY_LENGTH, CPU_THRESHOLD } from '@/constants'
import dayjs from 'dayjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  annotationPlugin
)

const props = defineProps<{
  cpuLoads: CpuLoadPoint[]
}>()

const cpuLoadWindow = computed<CpuLoadPoint[]>(() => {
  const { cpuLoads } = props
  const firstDate = cpuLoads[0]?.date ?? new Date() // if cpuLoads is empty, use current date
  const initialFilledDates = Array.from({
    length: WINDOW_HISTORY_LENGTH - cpuLoads.length,
  })
    .map((_, index) => ({
      value: undefined,
      date: dayjs(firstDate)
        .subtract((index + 1) * TIME_INTERVAL, 'milliseconds')
        .toDate(),
    }))
    .reverse()
  return [...initialFilledDates, ...cpuLoads]
})

const chartData = computed(() => ({
  labels: cpuLoadWindow.value.map((cpuLoad) => dayjs(cpuLoad.date).format('HH:mm:ss')),
  datasets: [
    {
      label: 'Average CPU Load',
      data: cpuLoadWindow.value.map((cpuLoad) => cpuLoad.value),
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time',
      },
    },
    y: {
      title: {
        display: true,
        text: 'CPU Load',
      },
      min: 0,
    },
  },
  plugins: {
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: CPU_THRESHOLD,
          yMax: CPU_THRESHOLD,
          borderColor: 'white',
          borderWidth: 1,
          borderDash: [5, 5],
        },
      },
    },
  },
}))
</script>

<template>
  <Line :data="chartData" :options="chartOptions"></Line>
</template>
