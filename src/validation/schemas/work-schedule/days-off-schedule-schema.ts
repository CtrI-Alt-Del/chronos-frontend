import { z } from 'zod'

export const daysOffScheduleSchema = z.object({
  daysOffCount: z.number().min(1),
  workdaysCount: z.number().min(1),
  daysOff: z.array(z.string()),
})
