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
  getWorkTime,
} from './work-schedule-actions'
import {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
} from './collaboration-actions'
import {
  createDayOffScheduleAdjustmentSolicitation,
  createDayOffSolicitation,
  createJustificationType,
  createTimePunchAdjustmentSolicitation,
  deleteJustificaionType,
  getAttachmentUrl,
  listJustificationTypes,
  resolveSolicitation,
  updateJustificationType,
} from './solicitation-actions'
import {
  getHourBankBalance,
  createHourBankTransactionAdjustment,
} from './hour-bank-actions'

const solicitationActions = {
  createDayOffScheduleAdjustmentSolicitation,
  resolveSolicitation,
  createJustificationType,
  deleteJustificaionType,
  updateJustificationType,
  listJustificationTypes,
  createTimePunchAdjustmentSolicitation,
  createDayOffSolicitation,
  getAttachmentUrl,
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
  getWorkTime,
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

const hourBankActions = {
  getHourBankBalance,
  createHourBankTransactionAdjustment,
}

export {
  authActions,
  cookieActions,
  workScheduleActions,
  collaborationActions,
  solicitationActions,
  hourBankActions,
}
