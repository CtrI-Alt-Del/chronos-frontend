'use server'

import { z } from 'zod'

import { CACHE } from '@/@core/global/constants'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import {
  CreateWorkScheduleAction,
  UpdateWeekScheduleAction,
  GetDayOffScheduleAction,
  GetTodayWorkdayLogAction,
  GetWeekScheduleAction,
  ListWorkSchedulesAction,
  PunchTimeAction,
  UpdateDayOffAction,
} from '../actions/work-schedule'
import {
  daysOffScheduleSchema,
  timePunchSchema,
  weekScheduleSchema,
  workScheduleSchema,
} from '@/validation/schemas/work-schedule'

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

export const getWeekSchedule = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient({
      cacheKey: CACHE.workSchedule.weekSchedule.key(clientInput.collaboratorId),
    })
    const service = WorkScheduleService(apiClient)
    const action = GetWeekScheduleAction(service)
    return action.handle(actionServer)
  })

export const getDayOffSchedule = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient({
      cacheKey: CACHE.workSchedule.dayOffSchedule.key(clientInput.collaboratorId),
    })
    const service = WorkScheduleService(apiClient)
    const action = GetDayOffScheduleAction(service)
    return action.handle(actionServer)
  })

export const listWorkSchedules = authActionClient.action(async () => {
  const actionServer = NextActionServer()
  const apiClient = await NextServerApiClient({
    cacheKey: CACHE.workSchedule.schedules.key,
  })
  const service = WorkScheduleService(apiClient)
  const action = ListWorkSchedulesAction(service)
  return action.handle(actionServer)
})

export const createWorkSchedule = authActionClient
  .schema(workScheduleSchema)
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = CreateWorkScheduleAction(service)
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
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = UpdateDayOffAction(service)
    return action.handle(actionServer)
  })

export const updateWeekSchedule = authActionClient
  .schema(
    z.object({
      collaboratorId: z.string().uuid(),
      weekSchedule: weekScheduleSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = UpdateWeekScheduleAction(service)
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
