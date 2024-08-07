import { CPU_THRESHOLD, TIME_INTERVAL, WINDOW_THRESHOLD_LENGTH } from '@/constants';
import { fetchCpuLoadAverage } from '@/services/cpuLoadApi';
import { useAlertsStore } from '@/stores/alertsStore';
import { useCpuLoadsStore } from '@/stores/cpuLoadsStore';
import { EventType } from '@/types/alertEvent';
import type { CpuLoadPoint } from '@/types/cpuLoadPoint';
import { storeToRefs } from 'pinia';
import type { Ref } from 'vue';

async function fetchCpuLoad() {
  const cpuLoadStore = useCpuLoadsStore();
  const alertsStore = useAlertsStore();
  const { cpuLoads } = storeToRefs(cpuLoadStore);
  const { isOnHighLoadAlert } = storeToRefs(alertsStore);

  const loadAverage = await fetchCpuLoadAverage();
  cpuLoadStore.addCpuLoad(loadAverage);
  const alert = checkForNewAlerts({ cpuLoads, isOnHighLoadAlert });
  if (alert) {
    alertsStore.setNewAlert(alert);
  }
}

// Alerting logic base on the last window threshold length of CPU loads and the current alert status
export function checkForNewAlerts({
  cpuLoads,
  isOnHighLoadAlert,
}: {
  cpuLoads: Ref<CpuLoadPoint[]>;
  isOnHighLoadAlert: Ref<boolean>;
}): EventType | undefined {
  if (cpuLoads.value.length < WINDOW_THRESHOLD_LENGTH) {
    return undefined;
  }
  const lastLoads = cpuLoads.value.slice(-WINDOW_THRESHOLD_LENGTH);
  const isHighLoadWindow = lastLoads.every((load) => (load.value ?? 0) > CPU_THRESHOLD);
  if (isHighLoadWindow && !isOnHighLoadAlert.value) {
    return EventType.HIGH_CPU_LOAD;
  }
  const isRecoveredWindow = lastLoads.every((load) => (load.value ?? 0) < CPU_THRESHOLD);
  if (isRecoveredWindow && isOnHighLoadAlert.value) {
    return EventType.RECOVERED_CPU_LOAD;
  }
  return undefined;
}

// Start/stop fetching CPU loads independently from the Vue app
let intervalId: NodeJS.Timeout | undefined;

export function startCpuLoadFetching() {
  intervalId = setInterval(fetchCpuLoad, TIME_INTERVAL);
  fetchCpuLoad();
}

export function stopCpuLoadFetching() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}
