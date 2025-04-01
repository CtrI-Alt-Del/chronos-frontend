import { z } from 'zod'

export const daysOffScheduleSchema = z.object({
  workdaysCount: z.number().min(1),
  daysOffCount: z.number().min(1),
  daysOff: z.array(z.string()),
})
