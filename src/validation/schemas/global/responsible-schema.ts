import { z } from 'zod'
import { idSchema } from './id-schema'
import { emailSchema } from './email-schema'
import { nameSchema } from './name-schema'
import { roleSchema } from './role-schema'
import { sectorSchema } from './sector-schema'

export const responsibleSchema = z.object({
  id: idSchema,
  name: nameSchema,
  email: emailSchema,
  role: roleSchema,
  sector: sectorSchema,
})
