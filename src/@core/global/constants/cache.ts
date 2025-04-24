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
    justificationType: {
      key: 'solicitation/justification-type',
    },
  },
} as const
