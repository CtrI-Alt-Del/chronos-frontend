import { z } from 'zod'
import { dayOffSchema } from '@/validation/schemas/global'

export const createWithdrawSolicitationSchema = z.object({
  withdrawalDays: z.array(dayOffSchema),
})
