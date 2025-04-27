'use server'

import { z } from 'zod'

import { CACHE } from '@/@core/global/constants'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { NextCall } from '@/server/next/next-server-action'
import {
  daysOffScheduleSchema,
  weekScheduleSchema,
} from '@/validation/schemas/work-schedule'
import { authActionClient } from './clients/auth-action-client'
import {
  GetDayOffScheduleAction,
  GetTodayWorkdayLogAction,
  PunchTimeAction,
  UpdateDayOffAction,
} from '../actions/work-schedule'
import { GetWorkTimeAction } from '../actions/work-schedule/get-work-time-action'

const getTodayWorkdayLog = authActionClient.action(async ({ clientInput, ctx }) => {
  const actionServer = NextCall({
    request: clientInput,
    account: ctx.account,
  })
  const apiClient = await NextServerRestClient({
    cacheKey: CACHE.workSchedule.todayWordayLog.key(ctx.account.id),
  })
  const service = WorkScheduleService(apiClient)
  const action = GetTodayWorkdayLogAction(service)
  return action.handle(actionServer)
})

export const getDayOffSchedule = authActionClient
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
      cacheKey: CACHE.workSchedule.dayOffSchedule.key(clientInput.collaboratorId),
    })
    const service = WorkScheduleService(apiClient)
    const action = GetDayOffScheduleAction(service)
    return action.handle(actionServer)
  })

export const updateDayOffSchedule = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string().uuid(),
      dayOffSchedule: daysOffScheduleSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient()
    const service = WorkScheduleService(apiClient)
    const action = UpdateDayOffAction(service)
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
    const actionServer = NextCall({
      request: clientInput,
      account: ctx.account,
    })
    const apiClient = await NextServerRestClient({
      cacheKey: CACHE.workSchedule.todayWordayLog.key(ctx.account.id),
    })
    const service = WorkScheduleService(apiClient)
    const action = PunchTimeAction(service)
    return action.handle(actionServer)
  })

export const getWorkTime = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({ isCacheEnabled: false })
    const service = WorkScheduleService(apiClient)
    const action = GetWorkTimeAction(service)
    return action.handle(actionServer)
  })

export { getTodayWorkdayLog, punchTime }
