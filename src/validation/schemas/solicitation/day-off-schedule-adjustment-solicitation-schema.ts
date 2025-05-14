import { z } from 'zod'

import { daysOffScheduleSchema, workScheduleSchema } from '../work-schedule'
import {
  responsibleAggregateSchema,
  idSchema,
  dateSchema,
  descriptionSchema,
  feedbackMessageSchema,
} from '@/validation/schemas/global'

export const dayOffScheduleAdjustmentSolicitationSchema = z.object({
  id: idSchema.optional(),
  description: descriptionSchema.optional(),
  date: dateSchema.optional(),
  status: z.enum(['PENDING', 'APPROVED', 'DENIED']).optional(),
  feedbackMessage: feedbackMessageSchema,
  senderResponsible: responsibleAggregateSchema.optional(),
  replierResponsible: responsibleAggregateSchema.optional(),
  type: z.literal('DAY_OFF_SCHEDULE'),
  dayOffSchedule: daysOffScheduleSchema,
})
