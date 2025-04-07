export const CACHE = {
  collaboration: {
    collaborator: {
      key: (collaboratorId: string) => `/collaboration/collaborator/${collaboratorId}`,
    },
    collaborators: {
      key: '/collaboration/collaborators',
    },
  },
  workSchedule: {
    todayWordayLog: {
      key: (collaboratorId: string) => `/workSchedule/worday-log/today/${collaboratorId}`,
    },
    sectorHistory: {
      key: '/workSchedule/sector-history',
    },
    collaboratorHistory: {
      key: '/workSchedule/collaborator-history',
    },
    schedules: {
      key: '/workSchedule/schedules',
    },
    weekSchedule: {
      key: (collaboratorId: string) => `/workSchedule/week-schedule/${collaboratorId}`,
    },
    dayOffSchedule: {
      key: (collaboratorId: string) => `/workSchedule/day-off-schedule/${collaboratorId}`,
    },
    schedule: {
      key: (scheduleId: string) => `/workSchedule/schedules/${scheduleId}`,
    },
  },
  solicitation: {
    solicitations: {
      key: 'solicitation/solicitations',
    },
  },
} as const
