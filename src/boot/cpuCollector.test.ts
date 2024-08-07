import { describe, it, expect } from 'vitest'
import { ref } from 'vue'

import { checkForNewAlerts } from './cpuCollector'
import { EventType } from '@/types/alertEvent'

describe('cpuCollector', () => {
  describe('checkForNewAlerts', () => {
    it('should return undefined if the cpuLoads length is less than the window threshold length', () => {
      const cpuLoads = ref([
        { value: 2, date: new Date('2000-01-01T00:00:00') },
        { value: 2, date: new Date('2000-01-01T00:00:10') },
        { value: 2, date: new Date('2000-01-01T00:00:20') },
        { value: 2, date: new Date('2000-01-01T00:00:30') },
        { value: 2, date: new Date('2000-01-01T00:00:40') },
      ])
      const isOnHighLoadAlert = ref(false)
      const undefinedResult = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert,
      })
      expect(undefinedResult).toBeUndefined()
    })

    it('should return HIGH_CPU_LOAD if all the cpuLoads are above the CPU_THRESHOLD and we are not already on high load alert', () => {
      const cpuLoads = ref([
        { value: 2, date: new Date('2000-01-01T00:00:00') },
        { value: 2, date: new Date('2000-01-01T00:00:10') },
        { value: 2, date: new Date('2000-01-01T00:00:20') },
        { value: 2, date: new Date('2000-01-01T00:00:30') },
        { value: 2, date: new Date('2000-01-01T00:00:40') },
        { value: 2, date: new Date('2000-01-01T00:00:50') },
        { value: 2, date: new Date('2000-01-01T00:01:00') },
        { value: 2, date: new Date('2000-01-01T00:01:10') },
        { value: 2, date: new Date('2000-01-01T00:01:20') },
        { value: 2, date: new Date('2000-01-01T00:01:30') },
        { value: 2, date: new Date('2000-01-01T00:01:40') },
        { value: 2, date: new Date('2000-01-01T00:01:50') },
      ])
      const highLoadResult = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert: ref(false),
      })
      expect(highLoadResult).toBe(EventType.HIGH_CPU_LOAD)

      // Avoid trigger the alert again
      const undefinedResult = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert: ref(true),
      })
      expect(undefinedResult).toBeUndefined()
    })

    it('should return RECOVERED_CPU_LOAD if all the cpuLoads are below the CPU_THRESHOLD and we are on high load alert', () => {
      const cpuLoads = ref([
        { value: 0.5, date: new Date('2000-01-01T00:00:00') },
        { value: 0.5, date: new Date('2000-01-01T00:00:10') },
        { value: 0.5, date: new Date('2000-01-01T00:00:20') },
        { value: 0.5, date: new Date('2000-01-01T00:00:30') },
        { value: 0.5, date: new Date('2000-01-01T00:00:40') },
        { value: 0.5, date: new Date('2000-01-01T00:00:50') },
        { value: 0.5, date: new Date('2000-01-01T00:01:00') },
        { value: 0.5, date: new Date('2000-01-01T00:01:10') },
        { value: 0.5, date: new Date('2000-01-01T00:01:20') },
        { value: 0.5, date: new Date('2000-01-01T00:01:30') },
        { value: 0.5, date: new Date('2000-01-01T00:01:40') },
        { value: 0.5, date: new Date('2000-01-01T00:01:50') },
      ])
      const recoveredResult = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert: ref(true),
      })
      expect(recoveredResult).toBe(EventType.RECOVERED_CPU_LOAD)

      // Avoid trigger the alert again
      const undefinedResult = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert: ref(false),
      })
      expect(undefinedResult).toBeUndefined()
    })

    it('should return undefined if the cpuLoads are mixed independently of the current alert status', () => {
      const cpuLoads = ref([
        { value: 2, date: new Date('2000-01-01T00:00:00') },
        { value: 0.5, date: new Date('2000-01-01T00:00:10') },
        { value: 2, date: new Date('2000-01-01T00:00:20') },
        { value: 0.5, date: new Date('2000-01-01T00:00:30') },
        { value: 2, date: new Date('2000-01-01T00:00:40') },
        { value: 0.5, date: new Date('2000-01-01T00:00:50') },
        { value: 2, date: new Date('2000-01-01T00:01:00') },
        { value: 0.5, date: new Date('2000-01-01T00:01:10') },
        { value: 2, date: new Date('2000-01-01T00:01:20') },
        { value: 0.5, date: new Date('2000-01-01T00:01:30') },
        { value: 2, date: new Date('2000-01-01T00:01:40') },
        { value: 0.5, date: new Date('2000-01-01T00:01:50') },
      ])
      const undefinedResult1 = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert: ref(false),
      })
      expect(undefinedResult1).toBeUndefined()
      const undefinedResult2 = checkForNewAlerts({
        cpuLoads,
        isOnHighLoadAlert: ref(true),
      })
      expect(undefinedResult2).toBeUndefined()
    })
  })
})
