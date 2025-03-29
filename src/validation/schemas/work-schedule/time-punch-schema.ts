import { z } from 'zod'

export const timePunchSchema = z.object({
  firstClockIn: z.string().nullable(),
  firstClockOut: z.string().nullable(),
  secondClockIn: z.string().nullable(),
  secondClockOut: z.string().nullable(),
})
