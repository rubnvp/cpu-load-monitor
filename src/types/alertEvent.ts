export enum EventType {
  HIGH_CPU_LOAD = 'HIGH_CPU_LOAD',
  RECOVERED_CPU_LOAD = 'RECOVERED_CPU_LOAD',
}

export interface AlertEvent {
  event: EventType;
  date: Date;
}
