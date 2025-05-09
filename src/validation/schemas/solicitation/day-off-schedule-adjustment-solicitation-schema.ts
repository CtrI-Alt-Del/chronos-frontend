import { z } from 'zod'
import { daysOffScheduleSchema } from '../work-schedule'

export const dayOffScheduleAdjustmentSolicitationSchema = z.object({
  dayOffSchedule: daysOffScheduleSchema,
})
