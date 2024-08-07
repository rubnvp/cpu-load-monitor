import { EventType } from '@/types/alertEvent'

const SECONDS = 1000 // one second has 1000 milliseconds
const MINUTES = 60 * SECONDS // one minute has 60 seconds

export const TIME_INTERVAL = 10 * SECONDS
export const MAX_TIME_WINDOW = 10 * MINUTES
export const WINDOW_HISTORY_LENGTH = MAX_TIME_WINDOW / TIME_INTERVAL

export const CPU_THRESHOLD = 1
export const CPU_TIME_THRESHOLD = 2 * MINUTES
export const WINDOW_THRESHOLD_LENGTH = CPU_TIME_THRESHOLD / TIME_INTERVAL

export const EVENT_TYPE_TO_LABEL_MAP = {
  [EventType.HIGH_CPU_LOAD]: '🚨 High average CPU load',
  [EventType.RECOVERED_CPU_LOAD]: '❤️‍🩹 Recovered CPU load',
}
export const MAX_ALERTS_AMOUNT = 100
