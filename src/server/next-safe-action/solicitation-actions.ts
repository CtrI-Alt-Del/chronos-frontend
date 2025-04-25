'use server'

import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '../next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import { SolicitationService } from '@/api/services'
import {
  CreateDayOffScheduleAdjustmentSolicitationAction,
  CreateJustificationTypeAction,
  DeleteJustificationTypeAction,
  ListJustificationTypesAction,
  ResolveSolicitationAction,
  UpdateJustificationTypeAction,
} from '../actions/solicitation'
import {
  createDayOffSolicitationSchema,
  dayOffScheduleAdjustmentSolicitationSchema,
  justificationTypeSchema,
} from '@/validation/schemas/solicitation'
import { resolveSolicitationSchema } from '@/validation/schemas/solicitation/resolve-solicitation-schema'
import { z } from 'zod'
import { timePunchAdjustmentSolicitationSchema } from '@/validation/schemas/solicitation/time-punch-adjustment-solicitation-schema'
import { CreateTimePunchAdjustmentSolicitationAction } from '../actions/solicitation/create-time-punch-adjustment-solicitation'
import { CACHE } from '@/@core/global/constants'
import { CreateDayOffSolicitationAction } from '../actions/solicitation/create-day-off-solicitation'

export const createDayOffScheduleAdjustmentSolicitation = authActionClient
  .schema(dayOffScheduleAdjustmentSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = SolicitationService(apiClient)
    const action = CreateDayOffScheduleAdjustmentSolicitationAction(service)
    return action.handle(actionServer)
  })

export const resolveSolicitation = authActionClient
  .schema(resolveSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = SolicitationService(apiClient)
    const action = ResolveSolicitationAction(service)
    return action.handle(actionServer)
  })

export const createJustificationType = authActionClient
  .schema(justificationTypeSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = SolicitationService(apiClient)
    const action = CreateJustificationTypeAction(service)
    return action.handle(actionServer)
  })

export const listJustificationTypes = authActionClient.action(async () => {
  const actionServer = NextActionServer()
  const apiClient = await NextServerRestClient({
    isCacheEnabled: true,
    cacheKey: CACHE.solicitation.justificationType.key,
  })
  const service = SolicitationService(apiClient)
  const action = ListJustificationTypesAction(service)
  return action.handle(actionServer)
})

export const deleteJustificaionType = authActionClient
  .schema(
    z.object({
      justificationTypeId: z.string().uuid(),
    }),
  )
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = SolicitationService(apiClient)
    const action = DeleteJustificationTypeAction(service)
    return action.handle(actionServer)
  })

export const updateJustificationType = authActionClient
  .schema(
    z.object({
      justificationTypeId: z.string().uuid(),
      justificationType: justificationTypeSchema,
    }),
  )
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = SolicitationService(apiClient)
    const action = UpdateJustificationTypeAction(service)
    return action.handle(actionServer)
  })
export const createTimePunchAdjustmentSolicitation = authActionClient
  .schema(timePunchAdjustmentSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = SolicitationService(apiClient)
    const action = CreateTimePunchAdjustmentSolicitationAction(service)
    return action.handle(actionServer)
  })

export const createDayOffSolicitation = authActionClient
  .schema(createDayOffSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = SolicitationService(apiClient)
    const action = CreateDayOffSolicitationAction(service)
    return action.handle(actionServer)
  })
