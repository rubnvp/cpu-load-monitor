import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CpuLoadPoint } from '@/types/cpuLoadPoint'
import { WINDOW_HISTORY_LENGTH } from '@/constants'

export const useCpuLoadsStore = defineStore('cpuLoads', () => {
  const cpuLoads = ref<CpuLoadPoint[]>([])
  const currentCpuLoad = computed<number | undefined>(() => cpuLoads.value[cpuLoads.value.length - 1]?.value)

  function addCpuLoad(cpuLoad: number): void {
    // shift the data in order to keep a maximum window length
    if (cpuLoads.value.length >= WINDOW_HISTORY_LENGTH) {
      cpuLoads.value.shift()
    }
    cpuLoads.value.push({
      value: cpuLoad,
      date: new Date(),
    })
  }
  return { cpuLoads, currentCpuLoad, addCpuLoad }
})
