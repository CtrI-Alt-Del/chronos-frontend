import { AppError } from '@/@core/global/errors'
import { z } from 'zod'
import { urlSchema } from '@/validation/schemas/global'

const ENV = {
  serverAppUrl: process.env.NEXT_PUBLIC_SERVER_APP_URL,
  webAppUrl: process.env.NEXT_PUBLIC_WEB_APP_URL,
}

const schema = z.object({
  serverAppUrl: urlSchema,
  webAppUrl: urlSchema,
})

const envValidation = schema.safeParse(ENV)

if (!envValidation.success) {
  throw new AppError('Env error', 'variáveis de ambiente não definidas corretamente')
}

const CLIENT_ENV = envValidation.data

export { CLIENT_ENV }
