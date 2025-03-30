import { allowPageByRoles } from './auth-actions'
import { getCookie, deleteCookie, hasCookie, setCookie } from './cookie-actions'
import {
  getTodayWorkdayLog,
  getWorkSchedule,
  editDaysOffSchedule,
  editTimePunchSchedule,
  editWeekSchedule,
  editWorkScheduleDescription,
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

const authActions = {
  allowPageByRoles,
}

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
  editWeekSchedule,
  editWorkScheduleDescription,
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

export { authActions, cookieActions, workScheduleActions, collaborationActions }
