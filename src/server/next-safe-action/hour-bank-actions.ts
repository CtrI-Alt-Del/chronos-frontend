'use server'

import { z } from 'zod'

import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import { CACHE } from '@/@core/global/constants'
import { GetHourBankBalanceAction } from '../actions/hours-bank/get-hour-bank-balance'
import { HourBankService } from '@/api/services'
import { CreateHourBankTransactionAdjustment } from '../actions/hours-bank/create-hour-bank-transaction-adjustment'

const hourBankSchema = z.object({
  value: z.string(),
  isNegative: z.boolean(),
})

export const getHourBankBalance = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({
      isCacheEnabled: true,
      cacheKey: CACHE.collaboration.collaborator.key(clientInput.collaboratorId),
    })
    const service = HourBankService(apiClient)
    const action = GetHourBankBalanceAction(service)
    return action.handle(actionServer)
  })

export const createHourBankTransactionAdjustment = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = HourBankService(apiClient)
    const action = CreateHourBankTransactionAdjustment(service)
    return action.handle(actionServer)
  })
