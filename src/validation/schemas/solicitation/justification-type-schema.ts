import { z } from 'zod'
import { idSchema, stringSchema, booleanSchema } from '@/validation/schemas/global'

export const justificationTypeSchema = z.object({
  id: idSchema.optional(),
  name: stringSchema,
  shouldHaveAttachment: booleanSchema,
})
