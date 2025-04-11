'use server'
import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '../next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import { SolicitationService } from '@/api/services'
import {
  CreateDayOffScheduleAdjustmentSolicitation,
  ResolveSolicitation,
} from '../actions/solicitation'
import {
  dayOffScheduleAdjustmentSolicitationSchema,
  solicitationSchema,
} from '@/validation/schemas/solicitation'
import { a } from 'next-safe-action/dist/index.types-Cct3QIs2.mjs'
import { resolveSolicitationSchema } from '@/validation/schemas/solicitation/resolve-solicitation-schema'

export const createDayOffScheduleAdjustmentSolicitation = authActionClient
  .schema(dayOffScheduleAdjustmentSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerApiClient({ isCacheEnabled: false })
    const service = SolicitationService(apiClient)
    const action = CreateDayOffScheduleAdjustmentSolicitation(service)
    return action.handle(actionServer)
  })
export const resolveSolicitation = authActionClient
  .schema(resolveSolicitationSchema)
  .action(async ({ ctx, clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerApiClient({ isCacheEnabled: false })
    const service = SolicitationService(apiClient)
    const action = ResolveSolicitation(service)
    return action.handle(actionServer)
  })
