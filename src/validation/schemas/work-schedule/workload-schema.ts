import { z } from 'zod'

export const workloadSchema = z.number().min(0, {
  message: 'Carga horária deve ser um número positivo',
})
