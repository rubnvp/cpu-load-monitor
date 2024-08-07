<script setup lang="ts">
import CpuLoadChart from '@/components/CpuLoadChart.vue';
import AlertsTable from '@/components/AlertsTable.vue';
import { useCpuLoadsStore } from '@/stores/cpuLoadsStore';
import { useAlertsStore } from '@/stores/alertsStore';
import { storeToRefs } from 'pinia';
import { CPU_THRESHOLD } from '@/constants';

const cpuLoadStore = useCpuLoadsStore();
const alertsStore = useAlertsStore();

const { cpuLoads, currentCpuLoad } = storeToRefs(cpuLoadStore);
const { alerts, isOnHighLoadAlert } = storeToRefs(alertsStore);

function formatCpuLoad(value: number | undefined): string {
  const num = Number(value);
  return !isNaN(num) ? num.toFixed(2) : '-';
}
</script>

<template>
  <main>
    <div class="monitor-view">
      <div class="chart-wrapper">
        <CpuLoadChart :cpuLoads="cpuLoads" />
      </div>
      <div class="current-cpu-wrapper">
        Current CPU load
        <h2 class="current-cpu" :class="{ highlighted: (currentCpuLoad ?? 0) > CPU_THRESHOLD }">
          {{ formatCpuLoad(currentCpuLoad) }}
        </h2>
        <span v-show="isOnHighLoadAlert">Under high average load!</span>
      </div>
    </div>
    <div>
      <h2>⚠️ Alerts</h2>
      <AlertsTable :alerts="alerts" :hightlightedFirstRow="isOnHighLoadAlert" />
    </div>
  </main>
</template>

<style scoped>
.monitor-view {
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.chart-wrapper {
  width: 80%;
  height: 300px;
}

.current-cpu-wrapper {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.current-cpu {
  font-size: 4rem;
}

.current-cpu.highlighted {
  color: #be3c39;
}
</style>
