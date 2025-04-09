'use server'

import { z } from 'zod'

import { authActionClient } from './clients/auth-action-client'
import { NextActionServer } from '../next/next-server-action'
import { AllowPageForRolesAction, UpdatePasswordAction } from '../actions/auth'
import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { AuthService } from '@/api/services/auth-service'

export const allowPageForRoles = authActionClient
  .schema(z.array(z.enum(['admin', 'manager', 'employee'])))
  .action(async ({ clientInput, ctx }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const action = AllowPageForRolesAction()
    return action.handle(actionServer)
  })

export const updatePassword = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
      password: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient({ isCacheEnabled: false })
    const service = AuthService(apiClient)
    const action = UpdatePasswordAction(service)
    return action.handle(actionServer)
  })
