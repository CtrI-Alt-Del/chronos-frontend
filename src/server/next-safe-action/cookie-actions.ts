'use server'

import { z } from 'zod'
import { NextCall } from '../next/next-server-action'
import { actionClient } from './clients/action-client'
import { stringSchema } from '@/validation/schemas/global'

const setCookie = actionClient
  .schema(
    z.object({
      key: stringSchema,
      value: stringSchema,
      expirationInSeconds: z.number().default(3600 * 24), // 1 day
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall()
    await actionServer.setCookie(
      clientInput.key,
      clientInput.value,
      clientInput.expirationInSeconds,
    )
  })

const getCookie = actionClient.schema(stringSchema).action(async ({ clientInput }) => {
  const actionServer = NextCall()
  return actionServer.getCookie(clientInput)
})

const deleteCookie = actionClient.schema(stringSchema).action(async ({ clientInput }) => {
  const actionServer = NextCall()
  await actionServer.deleteCookie(clientInput)
})

const hasCookie = actionClient.schema(stringSchema).action(async ({ clientInput }) => {
  const actionServer = NextCall()
  return await actionServer.hasCookie(clientInput)
})

export { setCookie, getCookie, deleteCookie, hasCookie }
