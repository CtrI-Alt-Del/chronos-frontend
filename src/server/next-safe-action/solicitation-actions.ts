'use server'

import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '../next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import { JustificationTypeService, SolicitationService } from '@/api/services'
import {
    CreateDayOffScheduleAdjustmentSolicitationAction,
  CreateJustificationTypeAction,
  DeleteJustificationTypeAction,
  ResolveSolicitationAction,
  UpdateJustificationTypeAction,
} from '../actions/solicitation'
import {
  dayOffScheduleAdjustmentSolicitationSchema,
  justificationTypeSchema,
} from '@/validation/schemas/solicitation'
import { resolveSolicitationSchema } from '@/validation/schemas/solicitation/resolve-solicitation-schema'
import { z } from 'zod'

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
    const service = JustificationTypeService(apiClient)
    const action = CreateJustificationTypeAction(service)
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
    const service = JustificationTypeService(apiClient)
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
    const service = JustificationTypeService(apiClient)
    const action = UpdateJustificationTypeAction(service)
    return action.handle(actionServer)
  })
