'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function useDatetime() {
  function formatCompleteDate(date: Date): string {
    return format(date, "EEEE, dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    })
  }

  function formatTime(date: Date): string {
    return format(date, 'HH:mm', {
      locale: ptBR,
    })
  }

  return {
    formatCompleteDate,
    formatTime,
  }
}
