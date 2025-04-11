import { z } from 'zod'
import { responsibleSchema } from './responsible-schema'
export const responsibleAggregateSchema = z.object({
  id: z.string().optional(),
  dto: responsibleSchema,
})
