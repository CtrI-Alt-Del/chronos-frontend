import { z } from 'zod'

export const collaboratorSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  cpf: z.string().min(11, { message: 'CPF deve ter 11 dígitos' }),
  role: z.string().min(1, { message: 'Cargo é obrigatório' }),
  workload: z.coerce.number({ required_error: 'Carga horária é obrigatória' }),
  sector: z.string().min(1, { message: 'Setor é obrigatório' }),
  isActive: z.boolean().default(true),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
    .optional(),
})
