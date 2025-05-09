import { z } from 'zod'

export const dateSchema = z.coerce.date({
  errorMap: () => ({ message: 'Data inválida' }),
})
