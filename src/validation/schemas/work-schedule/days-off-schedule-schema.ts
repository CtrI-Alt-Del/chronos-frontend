import { z } from 'zod'
import { stringSchema } from '@/validation/schemas/global'

export const daysOffScheduleSchema = z.object({
  workdaysCount: z.number().min(1),
  daysOffCount: z.number().min(1),
  daysOff: z.array(stringSchema),
})
