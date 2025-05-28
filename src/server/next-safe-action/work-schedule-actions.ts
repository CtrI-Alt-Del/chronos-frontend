'use server'

import { z } from 'zod'

import { CACHE } from '@/@core/global/constants'
import { WorkScheduleService } from '@/api/services/work-schedule-service'
import { NextServerRestClient } from '@/api/next/clients/next-server-api-client'
import { NextCall } from '@/server/next/next-server-action'
import { daysOffScheduleSchema } from '@/validation/schemas/work-schedule'
import { authActionClient } from './clients/auth-action-client'
import {
  GetDayOffScheduleAction,
  GetTodayWorkdayLogAction,
  GetTimeCardAction,
  PunchTimeAction,
  UpdateDayOffAction,
  GetWorkdayStatusReportAction,
  GetYearlyAbsenceReportAction,
  GetCollaboratorsMissingTimeReportAction,
  GetDailyPunchsReportAction,
} from '../actions/work-schedule'
import { GetWorkTimeAction } from '../actions/work-schedule/get-work-time-action'
import { idSchema, stringSchema } from '@/validation/schemas/global'

const getTodayWorkdayLog = authActionClient.action(async ({ clientInput, ctx }) => {
  const actionServer = NextCall({
    request: clientInput,
    account: ctx.account,
  })
  const apiClient = await NextServerRestClient({
    cacheKey: CACHE.workSchedule.todayWordayLog.key(ctx.account.id),
    isCacheEnabled: false,
  })
  const service = WorkScheduleService(apiClient)
  const action = GetTodayWorkdayLogAction(service)
  return action.handle(actionServer)
})

export const getTimeCard = authActionClient
  .schema(
    z.object({
      collaboratorId: idSchema,
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient({
      cacheKey: CACHE.workSchedule.timeCard.key(clientInput.collaboratorId),
    })
    const service = WorkScheduleService(apiClient)
    const action = GetTimeCardAction(service)
    return action.handle(actionServer)
  })

export const getDayOffSchedule = authActionClient
  .schema(
    z.object({
      collaboratorId: idSchema,
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
      collaboratorId: idSchema,
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
      workdayLogId: stringSchema,
      time: stringSchema,
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
      collaboratorId: idSchema,
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

export const getWorkdayStatusReport = authActionClient.action(async () => {
  const actionServer = NextCall()
  const apiClient = await NextServerRestClient()
  const service = WorkScheduleService(apiClient)
  const action = GetWorkdayStatusReportAction(service)
  return action.handle(actionServer)
})

export const getYearlyAbsenceReport = authActionClient
  .schema(
    z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient()
    const service = WorkScheduleService(apiClient)
    const action = GetYearlyAbsenceReportAction(service)
    return action.handle(actionServer)
  })

export const getDailyPunchsReport = authActionClient
  .schema(
    z.object({
      date: z.string(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient()
    const service = WorkScheduleService(apiClient)
    const action = GetDailyPunchsReportAction(service)
    return action.handle(actionServer)
  })

export const getCollaboratorsMissingTimeReport = authActionClient
  .schema(
    z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
  )
  .action(async ({ clientInput }) => {
    const actionServer = NextCall({
      request: clientInput,
    })
    const apiClient = await NextServerRestClient()
    const service = WorkScheduleService(apiClient)
    const action = GetCollaboratorsMissingTimeReportAction(service)
    return action.handle(actionServer)
  })

export { getTodayWorkdayLog, punchTime }
