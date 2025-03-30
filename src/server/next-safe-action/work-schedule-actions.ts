'use server'

import { z } from 'zod'

import { CACHE } from '@/@core/global/constants'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { NextActionServer } from '@/server/next/next-server-action'
import { authActionClient } from './clients/auth-action-client'
import {
  CreateWorkScheduleAction,
  DeleteWorkScheduleAction,
  EditDaysOffAction,
  EditTimeScheduleAction,
  EditWeekScheduleAction,
  EditWorkScheduleDescriptionAction,
  GetTodayWorkdayLogAction,
  GetWorkScheduleAction,
  ListWorkSchedulesAction,
  PunchTimeAction,
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

export const getWorkSchedule = authActionClient
  .schema(
    z.object({
      workScheduleId: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient({
      cacheKey: CACHE.workSchedule.schedule.key(clientInput.workScheduleId),
    })
    const service = WorkScheduleService(apiClient)
    const action = GetWorkScheduleAction(service)
    return action.handle(actionServer)
  })

export const listWorkSchedules = authActionClient
  .action(async () => {
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

export const editTimePunchSchedule = authActionClient
  .schema(
    z.object({
      workScheduleId: z.string().uuid(),
      timePunchScheduleId: z.string().uuid(),
      timePunchSchedule: timePunchSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = EditTimeScheduleAction(service)
    return action.handle(actionServer)
  })

export const editWeekSchedule = authActionClient
  .schema(
    z.object({
      workScheduleId: z.string().uuid(),
      weekSchedule: weekScheduleSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = EditWeekScheduleAction(service)
    return action.handle(actionServer)
  })

export const editDaysOffSchedule = authActionClient
  .schema(
    z.object({
      workScheduleId: z.string().uuid(),
      daysOffSchedule: daysOffScheduleSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = EditDaysOffAction(service)
    return action.handle(actionServer)
  })

export const editWorkScheduleDescription = authActionClient
  .schema(
    z.object({
      workScheduleId: z.string().uuid(),
      description: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = EditWorkScheduleDescriptionAction(service)
    return action.handle(actionServer)
  })

export const deleteWorkSchedule = authActionClient
  .schema(
    z.object({
      workScheduleId: z.string().uuid(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextActionServer({
      request: clientInput,
    })
    const apiClient = await NextServerApiClient()
    const service = WorkScheduleService(apiClient)
    const action = DeleteWorkScheduleAction(service)
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
