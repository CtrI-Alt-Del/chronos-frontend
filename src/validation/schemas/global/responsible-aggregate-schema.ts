import { z } from 'zod'
import { idSchema } from './id-schema'
import { emailSchema } from './email-schema'
import { nameSchema } from './name-schema'
import { roleSchema } from './role-schema'
import { sectorSchema } from './sector-schema'

export const responsibleAggregateSchema = z.object({
  id: idSchema.optional(),
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  role: roleSchema.optional(),
  sector: sectorSchema.optional(),
})
