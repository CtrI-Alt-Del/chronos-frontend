export const CACHE = {
  collaboration: {
    collaborator: {
      key: '/collaboration/collaborator',
    },
  },
  workSchedule: {
    todayWordayLog: {
      key: '/workSchedule/worday-log/today',
    },
    sectorHistory: {
      key: '/workSchedule/sector-history',
    },
    schedules: {
      key: '/workSchedule/schedules',
    },
    schedule: {
      key: (scheduleId: string) => `/workSchedule/schedules/${scheduleId}`,
    },
  },
} as const
