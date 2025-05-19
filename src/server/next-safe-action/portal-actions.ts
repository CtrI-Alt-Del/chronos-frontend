'use server'

import { z } from 'zod'

import { CACHE } from '@/@core/global/constants'
import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { PortalService } from '@/api/services'
import { NextCall } from '../next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import {
  CreateDayOffScheduleAdjustmentSolicitationAction,
  CreateJustificationTypeAction,
  CreatePaidOvertimeSolicitationAction,
  CreateTimePunchAdjustmentSolicitationAction,
  DeleteJustificationTypeAction,
  GetAttachmentUrlAction,
  ListJustificationTypesAction,
  ResolveSolicitationAction,
  UpdateJustificationTypeAction,
} from '../actions/solicitation'
import {
  createDayOffSolicitationSchema,
  createWithdrawSolicitationSchema,
  dayOffScheduleAdjustmentSolicitationSchema,
  justificationTypeSchema,
} from '@/validation/schemas/solicitation'
import { resolveSolicitationSchema } from '@/validation/schemas/solicitation/resolve-solicitation-schema'
import { timePunchAdjustmentSolicitationSchema } from '@/validation/schemas/solicitation/time-punch-adjustment-solicitation-schema'
import { CreateDayOffSolicitationAction } from '../actions/solicitation/create-day-off-solicitation'
import { CreateExcusedAbsenceSolicitation } from '../actions/solicitation/create-excused-absence-solicitation'
import { AttachJustificationToSolicitationAction } from '../actions/solicitation/attach-justification-to-solicitation-action'
import { idSchema, descriptionSchema, stringSchema } from '@/validation/schemas/global'
import { CreateWithdrawSolicitationAction } from '../actions/solicitation/create-withdraw-solicitation-action'

export const createDayOffScheduleAdjustmentSolicitation = authActionClient
  .schema(dayOffScheduleAdjustmentSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = CreateDayOffScheduleAdjustmentSolicitationAction(service)
    return action.handle(call)
  })

export const resolveSolicitation = authActionClient
  .schema(resolveSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = ResolveSolicitationAction(service)
    return action.handle(call)
  })

export const createJustificationType = authActionClient
  .schema(justificationTypeSchema)
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = PortalService(apiClient)
    const action = CreateJustificationTypeAction(service)
    return action.handle(call)
  })

export const listJustificationTypes = authActionClient.action(async () => {
  const call = NextCall()
  const apiClient = await NextServerRestClient({
    isCacheEnabled: true,
    cacheKey: CACHE.portal.justificationType.key,
  })
  const service = PortalService(apiClient)
  const action = ListJustificationTypesAction(service)
  return action.handle(call)
})

export const deleteJustificaionType = authActionClient
  .schema(
    z.object({
      justificationTypeId: idSchema,
    }),
  )
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = PortalService(apiClient)
    const action = DeleteJustificationTypeAction(service)
    return action.handle(call)
  })

export const updateJustificationType = authActionClient
  .schema(
    z.object({
      justificationTypeId: idSchema,
      justificationType: justificationTypeSchema,
    }),
  )
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = PortalService(apiClient)
    const action = UpdateJustificationTypeAction(service)
    return action.handle(call)
  })
export const createTimePunchAdjustmentSolicitation = authActionClient
  .schema(timePunchAdjustmentSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = CreateTimePunchAdjustmentSolicitationAction(service)
    return action.handle(call)
  })

export const createDayOffSolicitation = authActionClient
  .schema(createDayOffSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = CreateDayOffSolicitationAction(service)
    return action.handle(call)
  })

export const createPaidOvertimeSolicitation = authActionClient.action(async () => {
  const call = NextCall()
  const apiClient = await NextServerRestClient({ isCacheEnabled: false })
  const service = PortalService(apiClient)
  const action = CreatePaidOvertimeSolicitationAction(service)
  return action.handle(call)
})

export const getAttachmentUrl = authActionClient
  .schema(
    z.object({
      attachmentKey: stringSchema,
    }),
  )
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = GetAttachmentUrlAction(service)
    return action.handle(call)
  })
export const createExcusedAbsenceSolicitation = authActionClient
  .schema(z.object({ absenceDate: stringSchema }))
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = CreateExcusedAbsenceSolicitation(service)
    return action.handle(call)
  })
export const attachJustificationToSolicitation = authActionClient
  .schema(
    z.object({
      solicitationId: idSchema,
      justificationTypeId: idSchema,
      justificationTypeName: stringSchema,
      justificationTypeShouldHaveAttachment: stringSchema,
      description: descriptionSchema,
      attachment: z.instanceof(File).optional(),
    }),
  )
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = AttachJustificationToSolicitationAction(service)
    return action.handle(call)
  })

export const createWithdrawSolicitation = authActionClient
  .schema(createWithdrawSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const call = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = PortalService(apiClient)
    const action = CreateWithdrawSolicitationAction(service)
    return action.handle(call)
  })
