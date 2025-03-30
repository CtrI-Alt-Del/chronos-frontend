import { z } from 'zod'
import { timePunchSchema } from './time-punch-schema'

export const weekScheduleSchema = z
  .array(
    z.object({
      weekday: z.string(),
      timePunch: timePunchSchema,
    }),
  )
  .min(7)
  .max(7)
