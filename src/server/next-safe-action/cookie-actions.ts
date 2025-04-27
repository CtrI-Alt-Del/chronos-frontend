'use server'

import { z } from 'zod'
import { NextCall } from '../next/next-server-action'
import { actionClient } from './clients/action-client'

const setCookie = actionClient
  .schema(
    z.object({
      key: z.string(),
      value: z.string(),
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

const getCookie = actionClient.schema(z.string()).action(async ({ clientInput }) => {
  const actionServer = NextCall()
  return actionServer.getCookie(clientInput)
})

const deleteCookie = actionClient.schema(z.string()).action(async ({ clientInput }) => {
  const actionServer = NextCall()
  await actionServer.deleteCookie(clientInput)
})

const hasCookie = actionClient.schema(z.string()).action(async ({ clientInput }) => {
  const actionServer = NextCall()
  return await actionServer.hasCookie(clientInput)
})

export { setCookie, getCookie, deleteCookie, hasCookie }
