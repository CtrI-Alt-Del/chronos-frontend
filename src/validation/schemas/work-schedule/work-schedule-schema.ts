import { z } from 'zod'

import { weekScheduleSchema } from './week-schedule-schema'

export const workScheduleSchema = z.object({
  description: z.string(),
  workdaysCount: z.number().min(1),
  daysOffCount: z.number().min(1),
  daysOff: z.array(z.string()),
  weekSchedule: weekScheduleSchema,
})
