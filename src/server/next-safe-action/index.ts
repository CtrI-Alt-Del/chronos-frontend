import {
  allowPageForRoles,
  updateCollaboratorPassword,
  disableCollaboratorAccount,
  enableCollaboratorAccount,
} from './auth-actions'
import { getCookie, deleteCookie, hasCookie, setCookie } from './cookie-actions'
import {
  getTodayWorkdayLog,
  getDayOffSchedule,
  updateDayOffSchedule,
  punchTime,
} from './work-schedule-actions'
import {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
} from './collaboration-actions'
import {
  createDayOffScheduleAdjustmentSolicitation,
  createJustificationType,
  createTimePunchAdjustmentSolicitation,
  deleteJustificaionType,
  resolveSolicitation,
  updateJustificationType,
} from './solicitation-actions'

const solicitationActions = {
  createDayOffScheduleAdjustmentSolicitation,
  resolveSolicitation,
  createJustificationType,
  deleteJustificaionType,
  updateJustificationType,
  createTimePunchAdjustmentSolicitation,
}

const authActions = {
  allowPageForRoles,
  updateCollaboratorPassword,
  disableCollaboratorAccount,
  enableCollaboratorAccount,
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
  updateDayOffSchedule,
  punchTime,
}

const collaborationActions = {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
}

export {
  authActions,
  cookieActions,
  workScheduleActions,
  collaborationActions,
  solicitationActions,
}
