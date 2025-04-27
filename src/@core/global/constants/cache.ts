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
    workTime: {
      key: (collaboratorId: string) => `/workSchedule/work-time/${collaboratorId}`,
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
  portal: {
    paidOvertimeSolicitations: {
      key: 'portal/paid-overtime-solicitations',
    },
    excusedabsenceSolicitations: {
      key: 'portal/excuse-absence-solicitations',
    },
    dayOffSolicitations: {
      key: 'portal/day-off-solicitations',
    },
    justificationType: {
      key: 'portal/justification-type',
    },
  },
  hourBank: {
    key: (collaboratorId: string) => `/hour-bank/transactions/${collaboratorId}`,
  },
} as const
