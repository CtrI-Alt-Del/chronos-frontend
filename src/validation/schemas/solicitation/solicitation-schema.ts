import { z } from 'zod'
import { responsibleAggregateSchema } from '../global/responsible-aggregate-schema'
import {
  descriptionSchema,
  idSchema,
  dateSchema,
  feedbackMessageSchema,
} from '@/validation/schemas/global'

export const solicitationSchema = z.object({
  id: idSchema.optional(),
  description: descriptionSchema.optional().nullable(),
  date: dateSchema.optional(),
  status: z.enum(['DENIED', 'APPROVED']),
  feedbackMessage: feedbackMessageSchema,
  senderResponsible: responsibleAggregateSchema.optional(),
  replierResponsible: responsibleAggregateSchema.nullable().optional(),
  type: z.enum(['DAY_OFF_SCHEDULE', 'TIME_PUNCH']).optional(),
})
