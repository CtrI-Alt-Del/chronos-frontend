import { z } from 'zod'
import { stringSchema } from '@/validation/schemas/global'

export const createWithdrawSolicitationSchema = z.object({
  startedAt: stringSchema,
  endedAt: stringSchema,
})
