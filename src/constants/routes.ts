export const ROUTES = {
  auth: {
    login: '/auth/login',
  },
  collaboration: {
    collaborators: '/collaboration/collaborators',
    registerCollaboration: '/collaboration/register-collaboration',
    profile: '/collaboration//profile',
  },
  workSchedule: {
    schedules: '/work-schedule/schedules',
    registerSchedule: '/work-schedule/register-schedule',
    history: '/work-schedule/history',
    collaboratorHistory: '/work-schedule/collaborator-history',
    timePunch: '/work-schedule/time-punch',
    timeCard: '/work-schedule/time-card',
  },
  solicitation: {
    solicitations: '/solicitation/solicitations',
  },
  report: '/relatorio',
} as const
