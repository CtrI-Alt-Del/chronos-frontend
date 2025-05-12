import { z } from 'zod'
import { dayOffSchema } from '@/validation/schemas/global'
import { workloadSchema } from '@/validation/schemas/work-schedule'

export const createDayOffSolicitationSchema = z.object({
  dayOff: dayOffSchema,
  workload: workloadSchema.optional(),
})
