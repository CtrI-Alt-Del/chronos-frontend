import { AppError } from '@/@core/global/errors'
import { z } from 'zod'

const ENV = {
  serverAppUrl: process.env.SERVER_APP_URL,
}

const schema = z.object({
  serverAppUrl: z.string().url(),
})

const envValidation = schema.safeParse(ENV)

if (!envValidation.success) {
  throw new AppError('Env error', 'variáveis de ambiente não definidas corretamente')
}

const CLIENT_ENV = envValidation.data

export { CLIENT_ENV }
