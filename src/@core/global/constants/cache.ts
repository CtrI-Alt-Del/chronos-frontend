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
    collaboratorHistory: {
      key: 'collaboratorHistory',
    },
  },
  solicitation:{
    solicitations:{
      key: 'solicitation/solicitations',
    }
  }
} as const
