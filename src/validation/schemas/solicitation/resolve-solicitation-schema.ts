import { z } from 'zod'
import { responsibleAggregateSchema } from '../global/responsible-aggregate-schema'

export const resolveSolicitationSchema = z.object({
  id: z.string().optional(),
  status: z.enum(['DENIED', 'APPROVED']),
  feedbackMessage: z.string().optional(),
  type: z.enum(['DAY_OFF_SCHEDULE', 'TIME_PUNCH',"DAY_OFF"]),
  collaboratorId: z.string()
})
