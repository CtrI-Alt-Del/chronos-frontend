'use server'

import { z } from 'zod'

import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { CollaborationService } from '@/api/services'
import { NextActionServer } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import {
  GetCollaboratorAction,
  GetCollaboratorProfileAction,
} from '../actions/collaboration'

const getCollaborator = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient({ isCacheEnabled: true })
    const service = CollaborationService(apiClient)
    const action = GetCollaboratorAction(service)
    return action.handle(actionServer)
  })

const getCollaboratorProfile = authActionClient.action(async ({ ctx, clientInput }) => {
  const actionServer = NextActionServer({
    request: clientInput,
    account: ctx.account,
  })
  const apiClient = await NextServerApiClient({ isCacheEnabled: true })
  const service = CollaborationService(apiClient)
  const action = GetCollaboratorProfileAction(service)
  return action.handle(actionServer)
})

export { getCollaborator, getCollaboratorProfile }
