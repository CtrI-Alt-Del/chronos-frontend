import { z } from 'zod'

export const statusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELED'], {
  errorMap: () => ({ message: 'Status inválido' }),
})
