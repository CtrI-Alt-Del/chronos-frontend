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
  getTimeCard,
  updateDayOffSchedule,
  punchTime,
  getWorkTime,
  getYearlyAbsenceReport,
  getDailyPunchsReport,
  getCollaboratorsMissingTimeReport,
  getWorkdayStatusReport,
} from './work-schedule-actions'
import {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
} from './collaboration-actions'
import {
  createDayOffScheduleAdjustmentSolicitation,
  createDayOffSolicitation,
  createTimePunchAdjustmentSolicitation,
  createJustificationType,
  deleteJustificaionType,
  getAttachmentUrl,
  listJustificationTypes,
  resolveSolicitation,
  updateJustificationType,
  createExcusedAbsenceSolicitation,
  attachJustificationToSolicitation,
  createWithdrawSolicitation,
  createVacationSolicitation,
} from './portal-actions'
import {
  listHourBankTransactions,
  getHourBankBalance,
  createHourBankTransactionAdjustment,
  createPaidOvertime,
} from './hour-bank-actions'

const portalActions = {
  createExcusedAbsenceSolicitation,
  attachJustificationToSolicitation,
  createDayOffScheduleAdjustmentSolicitation,
  resolveSolicitation,
  createJustificationType,
  deleteJustificaionType,
  updateJustificationType,
  listJustificationTypes,
  createTimePunchAdjustmentSolicitation,
  createDayOffSolicitation,
  getAttachmentUrl,
  createWithdrawSolicitation,
  createVacationSolicitation,
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
  getTimeCard,
  updateDayOffSchedule,
  punchTime,
  getWorkdayStatusReport,
  getYearlyAbsenceReport,
  getDailyPunchsReport,
  getCollaboratorsMissingTimeReport,
}

const collaborationActions = {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
}

const hourBankActions = {
  listHourBankTransactions,
  getHourBankBalance,
  createHourBankTransactionAdjustment,
  createPaidOvertime,
}

export {
  authActions,
  cookieActions,
  workScheduleActions,
  collaborationActions,
  portalActions,
  hourBankActions,
}
