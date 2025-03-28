'use client'

import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import { addDays, subDays } from 'date-fns'
import { useCallback } from 'react'

const TIME_ZONE = 'America/Sao_Paulo'

export function useDatetime() {
  function formatCompleteDate(date: Date): string {
    return formatInTimeZone(new Date(date), TIME_ZONE, "EEEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    })
  }

  function formatIsoDate(date: Date): string {
    return formatInTimeZone(new Date(date), TIME_ZONE, 'yyyy-MM-dd')
  }

  function formatDate(date: Date): string {
    return formatInTimeZone(new Date(date), TIME_ZONE, 'dd/MM/yyyy')
  }

  function formatTime(date: Date | string): string {
    if (typeof date === 'string') {
      return date.slice(0, 5)
    }

    return formatInTimeZone(date, TIME_ZONE, 'HH:mm', {
      locale: ptBR,
    })
  }

  const inZonedTime = useCallback((date: Date | string) => {
    if (typeof date === 'string') {
      return toZonedTime(new Date(date), TIME_ZONE)
    }

    return toZonedTime(date, TIME_ZONE)
  }, [])

  function minusDays(date: Date, daysCount: number) {
    return subDays(inZonedTime(date), daysCount)
  }

  function plusDays(date: Date, daysCount: number) {
    return addDays(inZonedTime(date), daysCount)
  }

  const getCurrentDate = useCallback(() => {
    return inZonedTime(new Date())
  }, [inZonedTime])

  return {
    formatCompleteDate,
    formatTime,
    formatIsoDate,
    formatDate,
    getCurrentDate,
    minusDays,
    plusDays,
    inZonedTime,
  }
}
