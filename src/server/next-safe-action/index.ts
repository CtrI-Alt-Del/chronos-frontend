import { getCookie, deleteCookie, hasCookie, setCookie } from './cookie-actions'
import { getTodayWorkdayLog, punchTime } from './work-schedule-actions'
import { getCollaborator, getCollaboratorProfile } from './collaboration-actions'

const cookieActions = {
  getCookie,
  deleteCookie,
  hasCookie,
  setCookie,
}

const workScheduleActions = {
  getTodayWorkdayLog,
  punchTime,
}

const collaborationActions = {
  getCollaborator,
  getCollaboratorProfile,
}

export { cookieActions, workScheduleActions, collaborationActions }
