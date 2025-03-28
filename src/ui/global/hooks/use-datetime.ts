'use client'

import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import { useCallback } from 'react'

const TIME_ZONE = 'America/Sao_Paulo'

export function useDatetime() {
  function formatCompleteDate(date: Date): string {
    return formatInTimeZone(new Date(date), TIME_ZONE, "EEEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    })
  }

  function formatTime(date: Date | string): string {
    if (typeof date === 'string') {
      return date.slice(0, 5)
    }

    return formatInTimeZone(date, TIME_ZONE, 'HH:mm', {
      locale: ptBR,
    })
  }

  const getCurrentDate = useCallback(() => {
    return toZonedTime(new Date(), TIME_ZONE)
  }, [])

  return {
    formatCompleteDate,
    formatTime,
    getCurrentDate,
  }
}
