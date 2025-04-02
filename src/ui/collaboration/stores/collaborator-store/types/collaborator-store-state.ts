import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { DayOffScheduleDto, WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import type { Tab } from './tab'

export type CollaboratorStoreState = {
  tab: Tab
  collaborator: CollaboratorDto | null
  dayOffSchedule: DayOffScheduleDto | null
  weekSchedule: WeekdayScheduleDto[]
}
