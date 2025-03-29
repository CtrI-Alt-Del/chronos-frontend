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
import { getCollaborator, getCollaboratorProfile } from './collaboration-actions'

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
}

export { cookieActions, workScheduleActions, collaborationActions }
