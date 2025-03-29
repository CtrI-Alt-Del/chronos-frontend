import { getCookie, deleteCookie, hasCookie, setCookie } from './cookie-actions'
import {
  getTodayWorkdayLog,
  getWorkSchedule,
  editDaysOffSchedule,
  editTimePunchSchedule,
  createWorkSchedule,
  deleteWorkSchedule,
  punchTime,
} from './work-schedule-actions'
import {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
  disableCollaborator,
  enableCollaborator,
} from './collaboration-actions'

const cookieActions = {
  getCookie,
  deleteCookie,
  hasCookie,
  setCookie,
}

const workScheduleActions = {
  getTodayWorkdayLog,
  getWorkSchedule,
  editDaysOffSchedule,
  editTimePunchSchedule,
  punchTime,
  createWorkSchedule,
  deleteWorkSchedule,
}

const collaborationActions = {
  getCollaborator,
  getCollaboratorProfile,
  updateCollaborator,
  disableCollaborator,
  enableCollaborator,
}

export { cookieActions, workScheduleActions, collaborationActions }
