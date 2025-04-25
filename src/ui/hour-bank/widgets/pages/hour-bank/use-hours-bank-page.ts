'use client'

import { CACHE } from '@/@core/global/constants'
import { useRest } from '@/ui/global/hooks'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useQueryParamDate } from '@/ui/global/hooks/use-query-param-date'
import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useState, useEffect } from 'react'

export interface HoursBankData {
  // id: string
  // date: string
  // workedHours: string
  // scheduledHours: string
  // balance: string
}

export function useHourBankPage(collaboratorId: string) {
  const today = new Date()

  return {
    today
  }
}
