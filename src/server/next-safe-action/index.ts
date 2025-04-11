import { allowPageForRoles, updatePassword } from './auth-actions'
import { getCookie, deleteCookie, hasCookie, setCookie } from './cookie-actions'
import {
  getTodayWorkdayLog,
  getDayOffSchedule,
  getWeekSchedule,
  updateDayOffSchedule,
  updateWeekSchedule,
  createWorkSchedule,
  punchTime,
} from './work-schedule-actions'
import {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
  disableCollaborator,
  enableCollaborator,
} from './collaboration-actions'
import { createDayOffScheduleAdjustmentSolicitation } from './solicitation-actions'

const solicitationActions = {
  createDayOffScheduleAdjustmentSolicitation,
}

const authActions = {
  allowPageForRoles,
  updatePassword,
}

const cookieActions = {
  getCookie,
  deleteCookie,
  hasCookie,
  setCookie,
}

const workScheduleActions = {
  getTodayWorkdayLog,
  getDayOffSchedule,
  getWeekSchedule,
  updateDayOffSchedule,
  updateWeekSchedule,
  punchTime,
  createWorkSchedule,
}

const collaborationActions = {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
  disableCollaborator,
  enableCollaborator,
}

export { authActions, cookieActions, workScheduleActions, collaborationActions,solicitationActions }
