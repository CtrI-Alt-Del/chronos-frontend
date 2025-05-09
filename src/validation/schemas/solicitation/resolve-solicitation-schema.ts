import { z } from 'zod'
import { responsibleAggregateSchema } from '../global/responsible-aggregate-schema'
import { idSchema, feedbackMessageSchema } from '@/validation/schemas/global'

export const resolveSolicitationSchema = z.object({
  id: idSchema.optional(),
  status: z.enum(['DENIED', 'APPROVED']),
  feedbackMessage: feedbackMessageSchema,
  type: z.enum(['DAY_OFF_SCHEDULE', 'TIME_PUNCH', 'DAY_OFF']),
  collaboratorId: idSchema,
})
