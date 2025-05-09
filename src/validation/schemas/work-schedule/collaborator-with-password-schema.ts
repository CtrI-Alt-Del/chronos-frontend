import { z } from 'zod'
import { cpfSchema } from '@/validation/schemas/global/cpf-schema'
import { emailSchema } from '@/validation/schemas/global/email-schema'
import { nameSchema } from '@/validation/schemas/global/name-schema'
import { passwordSchema } from '@/validation/schemas/global/password-schema'
import { roleSchema } from '@/validation/schemas/global/role-schema'
import { sectorSchema } from '@/validation/schemas/global/sector-schema'
import { booleanSchema } from '@/validation/schemas/global/boolean-schema'

export const collaboratorWithPasswordSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  role: roleSchema,
  sector: sectorSchema,
  isActive: booleanSchema,
  password: passwordSchema,
})
