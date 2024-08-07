import { EventType } from "@/types/alertEvent";

const SECONDS = 1000; // one second has 1000 milliseconds
const MINUTES = 60 * SECONDS; // one minute has 60 seconds

export const TIME_INTERVAL = 1 * SECONDS; // TODO: change to 10 seconds
export const MAX_TIME_WINDOW = 1 * MINUTES; // TODO: change to 10 minutes
export const WINDOW_HISTORY_LENGTH = MAX_TIME_WINDOW / TIME_INTERVAL;

export const CPU_THRESHOLD = 1;
export const CPU_TIME_THRESHOLD = 12 * SECONDS; // TODO: change to 2 minutes
export const WINDOW_THRESHOLD_LENGTH = CPU_TIME_THRESHOLD / TIME_INTERVAL;

export const EVENT_TYPE_TO_LABEL_MAP = {
  [EventType.HIGH_CPU_LOAD]: '🚨 High Average CPU Load',
  [EventType.RECOVERED_CPU_LOAD]: '❤️‍🩹 Recovered CPU Load',
};
export const MAX_ALERTS_AMOUNT = 100;