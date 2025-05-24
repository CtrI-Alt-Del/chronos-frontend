import { z } from 'zod'
import { dayOffSchema, stringSchema } from '@/validation/schemas/global'

export const createWithdrawSolicitationSchema = z.object({
  startedAt: stringSchema,
  endedAt: stringSchema,
})
