import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { DayOffScheduleDto, WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import type { Tab } from './tab'

export type CollaboratorStoreActions = {
  setTab: (tab: Tab) => void
  setCollaborator: (collaborator: CollaboratorDto) => void
  setDayOffSchedule: (dayOfSchedule: DayOffScheduleDto) => void
  resetStore: () => void
}
