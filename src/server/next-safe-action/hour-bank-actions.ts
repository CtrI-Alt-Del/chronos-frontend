'use server'

import { z } from 'zod'

import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { NextCall } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import { CACHE } from '@/@core/global/constants'
import { HourBankService } from '@/api/services'
import {
  CreateHourBankTransactionAdjustmentAction,
  CreatePaidOvertimeAction,
  GetHourBankBalanceAction,
  ListHourBankTransactionsAction,
} from '../actions/hours-bank'
import { idSchema, stringSchema } from '@/validation/schemas/global'

export const listHourBankTransactions = authActionClient
  .schema(
    z.object({
      collaboratorId: idSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const restClient = await NextServerRestClient({
      cacheKey: CACHE.hourBank.key(clientInput.collaboratorId),
      isCacheEnabled: false,
    })
    const service = HourBankService(restClient)
    const action = ListHourBankTransactionsAction(service)
    return action.handle(actionServer)
  })

export const getHourBankBalance = authActionClient
  .schema(
    z.object({
      collaboratorId: idSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const restClient = await NextServerRestClient({
      cacheKey: CACHE.hourBank.key(clientInput.collaboratorId),
      isCacheEnabled: false,
    })
    const service = HourBankService(restClient)
    const action = GetHourBankBalanceAction(service)
    return action.handle(actionServer)
  })

export const createHourBankTransactionAdjustment = authActionClient
  .schema(
    z.object({
      collaboratorId: idSchema,
      transactionTime: stringSchema,
      transactionOperation: stringSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const restClient = await NextServerRestClient({
      cacheKey: CACHE.hourBank.key(clientInput.collaboratorId),
      isCacheEnabled: false,
    })
    const service = HourBankService(restClient)
    const action = CreateHourBankTransactionAdjustmentAction(service)
    return action.handle(actionServer)
  })

export const createPaidOvertime = authActionClient
  .schema(
    z.object({
      collaboratorId: idSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const restClient = await NextServerRestClient({
      cacheKey: CACHE.hourBank.key(clientInput.collaboratorId),
      isCacheEnabled: false,
    })
    const service = HourBankService(restClient)
    const action = CreatePaidOvertimeAction(service)
    return action.handle(actionServer)
  })
