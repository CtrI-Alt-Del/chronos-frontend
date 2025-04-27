'use server'

import { z } from 'zod'

import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { CollaborationService } from '@/api/services'
import { NextCall } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import {
  GetCollaboratorAction,
  GetCollaboratorProfileAction,
  UpdateCollaboratorAction,
} from '../actions/collaboration'
import { CACHE } from '@/@core/global/constants'

const collaboratorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  isActive: z.boolean(),
  role: z.string(),
  sector: z.string(),
  workload: z.number(),
  password: z.string().optional(),
})

export const getCollaborator = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({
      isCacheEnabled: true,
      cacheKey: CACHE.collaboration.collaborator.key(clientInput.collaboratorId),
    })
    const service = CollaborationService(apiClient)
    const action = GetCollaboratorAction(service)
    return action.handle(actionServer)
  })

export const getCollaboratorProfile = authActionClient.action(
  async ({ ctx, clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = CollaborationService(apiClient)
    const action = GetCollaboratorProfileAction(service)
    return action.handle(actionServer)
  },
)

export const updateCollaborator = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string().uuid(),
      collaboratorDto: collaboratorSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: true })
    const service = CollaborationService(apiClient)
    const action = UpdateCollaboratorAction(service)
    return action.handle(actionServer)
  })
