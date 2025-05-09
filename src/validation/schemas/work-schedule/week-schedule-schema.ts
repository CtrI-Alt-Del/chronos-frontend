import { z } from 'zod'
import { timePunchSchema } from './time-punch-schema'
import { stringSchema } from '@/validation/schemas/global'

export const weekScheduleSchema = z
  .array(
    z.object({
      weekday: stringSchema,
      timePunch: timePunchSchema,
    }),
  )
  .min(7)
  .max(7)
