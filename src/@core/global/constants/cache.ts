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
    timeCard: {
      key: (collaboratorId: string) => `/workSchedule/time-card/${collaboratorId}`,
    },
    collaboratorsMissingTime: {
      key: '/workSchedule/collaborators-missing-time',
    },
    dailyTimePunch: {
      key: '/workSchedule/daily-time-punch',
    },
    yearlyUserAbsence: {
      key: '/workSchedule/yearly-user-absence',
    },
  },
  portal: {
    dayOffScheduleAdjustmentSolicitations: {
      key: 'portal/day-off-schedule-adjustment-solicitations',
    },
    paidOvertimeSolicitations: {
      key: 'portal/paid-overtime-solicitations',
    },
    excusedabsenceSolicitations: {
      key: 'portal/excuse-absence-solicitations',
    },
    dayOffSolicitations: {
      key: 'portal/day-off-solicitations',
    },
    vacationSolicitations: {
      key: 'portal/vacation-solicitations',
    },
    justificationType: {
      key: 'portal/justification-type',
    },
    workLeaveCalendar: {
      key: 'portal/work-leave-calendar',
    },
    timePunchLogAdjustmentSolicitations: {
      key: 'portal/time-punch-log-adjustment-solicitations',
    },
  },
  hourBank: {
    key: (collaboratorId: string) => `/hour-bank/transactions/${collaboratorId}`,
  },
} as const
