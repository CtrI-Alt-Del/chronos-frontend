'use server'

import { z } from 'zod'

import { authActionClient } from './clients/auth-action-client'
import { NextActionServer } from '../next/next-server-action'
import { AllowPageByRolesAction } from '../actions/auth'

export const allowPageByRoles = authActionClient
  .schema(z.array(z.enum(['admin', 'manager', 'employee'])))
  .action(async ({ clientInput, ctx }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const action = AllowPageByRolesAction()
    return action.handle(actionServer)
  })
