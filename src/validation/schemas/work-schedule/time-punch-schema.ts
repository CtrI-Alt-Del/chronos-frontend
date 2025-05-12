import { z } from 'zod'
import { stringSchema } from '@/validation/schemas/global'

export const timePunchSchema = z.object({
  firstClockIn: stringSchema.nullable(),
  firstClockOut: stringSchema.nullable(),
  secondClockIn: stringSchema.nullable(),
  secondClockOut: stringSchema.nullable(),
})
