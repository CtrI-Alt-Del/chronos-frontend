import { z } from 'zod'

import { weekScheduleSchema } from './week-schedule-schema'
import { descriptionSchema, stringSchema } from '@/validation/schemas/global'

export const workScheduleSchema = z.object({
  description: descriptionSchema,
  workdaysCount: z.number().min(1),
  daysOffCount: z.number().min(1),
  daysOff: z.array(stringSchema),
  weekSchedule: weekScheduleSchema,
})
