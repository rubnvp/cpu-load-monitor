<script setup lang="ts">
import { ref, onUnmounted, computed } from "vue";
import CpuLoadChart from '@/components/CpuLoadChart.vue';
import AlertsTable from '@/components/AlertsTable.vue';
import type { CpuLoadPoint } from "@/types/cpuLoadPoint";
import { EventType, type AlertEvent } from "@/types/alertEvent";
import { CPU_THRESHOLD, EVENT_TYPE_TO_LABEL_MAP, MAX_ALERTS_AMOUNT, TIME_INTERVAL, WINDOW_HISTORY_LENGTH, WINDOW_THRESHOLD_LENGTH } from "@/constants";
import { fetchCpuLoadAverage } from '@/services/cpuLoadApi';

const cpuLoads = ref<CpuLoadPoint[]>([]);
const lastCpuLoad = computed<number | undefined>(() => cpuLoads.value[cpuLoads.value.length - 1]?.value);
const alerts = ref<AlertEvent[]>([
  // { event: EventType.HIGH_CPU_LOAD, date: new Date('2024-08-07T12:00:00') },
  // { event: EventType.RECOVERED_CPU_LOAD, date: new Date('2024-08-07T12:30:00') },
]);
const isOnHighLoadAlert = computed(()=> alerts.value[alerts.value.length - 1]?.event === EventType.HIGH_CPU_LOAD);

async function fetchCpuLoad() {
  const loadAverage = await fetchCpuLoadAverage();
  if (cpuLoads.value.length >= WINDOW_HISTORY_LENGTH) {
    cpuLoads.value.shift();
  }
  const date = new Date();
  cpuLoads.value.push({
    value: loadAverage,
    date,
  });
  checkForNewAlerts();
}
fetchCpuLoad();
const interval = setInterval(fetchCpuLoad, TIME_INTERVAL);
onUnmounted(() => clearInterval(interval));

function checkForNewAlerts() {
  if (cpuLoads.value.length < WINDOW_THRESHOLD_LENGTH) {
    return;
  }
  const lastLoads = cpuLoads.value.slice(-WINDOW_THRESHOLD_LENGTH);
  const isHighLoadWindow = lastLoads.every(load => (load.value ?? 0) > CPU_THRESHOLD);
  if (isHighLoadWindow && !isOnHighLoadAlert.value) {
    setNewAlert(EventType.HIGH_CPU_LOAD);
  }
  const isRecoveredWindow = lastLoads.every(load => (load.value ?? 0) < CPU_THRESHOLD);
  if (isRecoveredWindow && isOnHighLoadAlert.value) {
    setNewAlert(EventType.RECOVERED_CPU_LOAD);
  }  
}

function setNewAlert(event: EventType) {
  alerts.value.push({ event, date: new Date() });
  if (alerts.value.length > MAX_ALERTS_AMOUNT) {
    alerts.value.shift();
  }
  if (Notification.permission === 'granted') {
    const eventLabel = EVENT_TYPE_TO_LABEL_MAP[event];
    if (eventLabel) new Notification('CPU Load Monitor', { body: eventLabel });
  }
}

function formatCpuLoad(value: number | undefined): string {
  const num = Number(value);
  return !isNaN(num)
    ? num.toFixed(2)
    : '-';
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
        <h2 class="current-cpu">
          {{ formatCpuLoad(lastCpuLoad) }}
        </h2>
      </div>
    </div>
    <div>
      <h2>⚠️ Alerts</h2>
      <AlertsTable :alerts="alerts" />
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
  /* justify-content: center; */
}

.current-cpu {
  font-size: 4rem;
  /* margin-top: 1rem; */
  /* color: #333; */
}
</style>