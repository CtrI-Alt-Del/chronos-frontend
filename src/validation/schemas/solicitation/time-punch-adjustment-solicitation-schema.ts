import { z } from 'zod'
import { responsibleAggregateSchema } from '../global/responsible-aggregate-schema'
import {
  dateSchema,
  descriptionSchema,
  feedbackMessageSchema,
  idSchema,
  stringSchema,
} from '@/validation/schemas/global'

export const timePunchAdjustmentSolicitationSchema = z.object({
  id: idSchema.optional(),
  description: descriptionSchema.optional(),
  date: dateSchema.optional(),
  status: z.enum(['PENDING', 'APPROVED', 'DENIED']).optional(),
  feedbackMessage: feedbackMessageSchema,
  senderResponsible: responsibleAggregateSchema.optional(),
  replierResponsible: responsibleAggregateSchema.optional(),
  type: z.literal('TIME_PUNCH').optional(),
  time: stringSchema,
  period: stringSchema,
  workdayLogDate: dateSchema,
  reason: stringSchema,
})
