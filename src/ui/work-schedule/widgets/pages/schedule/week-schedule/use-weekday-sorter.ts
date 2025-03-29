import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'

export function useWeekdaysSorter(weekdaysSchedule: WeekdayScheduleDto[]) {
  const weekdayOrder: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  }

  function sort(schedules: WeekdayScheduleDto[]) {
    return schedules.sort((a, b) => weekdayOrder[a.weekday] - weekdayOrder[b.weekday])
  }

  return sort(weekdaysSchedule)
}
