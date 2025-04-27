'use server'

import { z } from 'zod'

import { authActionClient } from './clients/auth-action-client'
import { NextCall } from '../next/next-server-action'
import {
  AllowPageForRolesAction,
  DisableCollaboratorAccountAction,
  EnableCollaboratorAccountAction,
  UpdateCollaboratorPasswordAction,
} from '../actions/auth'
import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { AuthService } from '@/api/services/auth-service'

export const allowPageForRoles = authActionClient
  .schema(z.array(z.enum(['admin', 'manager', 'employee'])))
  .action(async ({ clientInput, ctx }) => {
    const actionServer = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const action = AllowPageForRolesAction()
    return action.handle(actionServer)
  })

export const updateCollaboratorPassword = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
      password: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = AuthService(apiClient)
    const action = UpdateCollaboratorPasswordAction(service)
    return action.handle(actionServer)
  })

export const enableCollaboratorAccount = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = AuthService(apiClient)
    const action = EnableCollaboratorAccountAction(service)
    return action.handle(actionServer)
  })

export const disableCollaboratorAccount = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = AuthService(apiClient)
    const action = DisableCollaboratorAccountAction(service)
    return action.handle(actionServer)
  })
