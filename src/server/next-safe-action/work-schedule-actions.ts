'use server'

import { z } from 'zod'
import { CACHE } from '@/@core/global/constants'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import { GetTodayWorkdayLogAction, PunchTimeAction } from '../actions/work-schedule'

const getTodayWorkdayLog = authActionClient.action(async ({ clientInput, ctx }) => {
  const actionServer = NextActionServer({
    request: clientInput,
    account: ctx.account,
  })
  const apiClient = await NextServerApiClient({
    cacheKey: CACHE.workSchedule.todayWordayLog.key,
  })
  const service = WorkScheduleService(apiClient)
  const action = GetTodayWorkdayLogAction(service)
  return action.handle(actionServer)
})

const punchTime = authActionClient
  .schema(
    z.object({
      timePunchLogId: z.string(),
      time: z.date(),
    }),
  )
  .action(async ({ clientInput, ctx }) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerApiClient({ isCacheEnabled: false })
    const service = WorkScheduleService(apiClient)
    const action = PunchTimeAction(service)
    return action.handle(actionServer)
  })

export { getTodayWorkdayLog, punchTime }
