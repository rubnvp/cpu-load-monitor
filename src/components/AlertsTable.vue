<script setup lang="ts">
import { EVENT_TYPE_TO_LABEL_MAP } from '@/constants';
import { type AlertEvent, EventType } from '@/types/alertEvent';
import dayjs from 'dayjs';
import { defineProps, computed } from 'vue';

const props = defineProps<{
  alerts: AlertEvent[];
}>();

// computed property to reverse and avoid mutating the original array
const alerts = computed(() => props.alerts
  .map((alert, index) => ({ ...alert, index: index + 1 }))
  .reverse()
);

function formatEventName(event: EventType): string {
  return EVENT_TYPE_TO_LABEL_MAP[event] ?? 'Unknown';
}

function formatTime(date: Date): string {
  return dayjs(date).format('HH:mm:ss');
}
</script>

<template>
  <table class="alerts-table">
    <thead>
      <tr>
        <th>Index</th>
        <th>Event</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="alert in alerts" :key="alert.index + alert.event">
        <td>{{ alert.index }}</td>
        <td>{{ formatEventName(alert.event) }}</td>
        <td>{{ formatTime(alert.date) }}</td>
      </tr>
    </tbody>
  </table>
  <div v-if="!alerts.length" class="no-data">
    No alerts registered
  </div>
</template>

<style scoped>
.alerts-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.alerts-table th,
.alerts-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* .alerts-table th {
  background-color: #007bff;
  color: white;
}

.alerts-table tr:nth-child(even) {
  background-color: #f2f2f2;
} */

.alerts-table tr:hover {
  /* background-color: #f1f1f1; */
  /** background color semi transparent */
  background-color: rgba(0, 0, 0, 0.3);
}

.alerts-table th,
.alerts-table td {
  text-align: center;
}

.no-data {
  margin-top: 40px;
  text-align: center;
  font-size: 1.25rem;
  color: #777;
}
</style>