import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { EVENT_TYPE_TO_LABEL_MAP, MAX_ALERTS_AMOUNT } from '@/constants';
import { EventType, type AlertEvent } from '@/types/alertEvent';

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<AlertEvent[]>([]);
  const isOnHighLoadAlert = computed(() => alerts.value[alerts.value.length - 1]?.event === EventType.HIGH_CPU_LOAD);

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

  return { alerts, isOnHighLoadAlert, setNewAlert };
});
