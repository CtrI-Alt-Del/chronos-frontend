export const ROUTES = {
  root: '/',
  auth: {
    login: '/auth/login',
  },
  collaboration: {
    collaborators: '/collaboration/collaborators',
    collaborator: (collaboratorId: string) =>
      `/collaboration/collaborators/${collaboratorId}`,
    createCollaborator: '/collaboration/collaborators/create',
    profile: (collaboratorId: string) => `/collaboration/profile/${collaboratorId}`,
  },
  workSchedule: {
    schedules: '/work-schedule/schedules',
    schedule: (workScheduleId?: string) =>
      workScheduleId
        ? `/work-schedule/schedules/${workScheduleId}`
        : '/work-schedule/schedules/create',
    sectorHistory: '/work-schedule/sector-history',
    collaboratorHistory: '/work-schedule/collaborator-history',
    timePunch: '/work-schedule/time-punch',
    timeCard: '/work-schedule/time-card',
    hoursBank: '/work-schedule/hours-bank',
    dashboard: '/work-schedule/dashboard',
  },
  hourBank: (collaboratorId?: string) => `/hour-bank/${collaboratorId}`,
  portal: {
    solicitations: '/portal/solicitations',
    justificationTypes: '/portal/justification-types',
  },
  report: '/relatorio',
} as const
