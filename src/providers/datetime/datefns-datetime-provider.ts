import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'

import type { IDatetimeProvider } from '@/@core/global/interfaces/datetime-provider'

const TIME_ZONE = 'America/Sao_Paulo'

export const DateFnsDatetimeProvider = (): IDatetimeProvider => {
  return {
    formatCompleteDate(date) {
      return formatInTimeZone(new Date(date), TIME_ZONE, "EEEE, dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },

    formatTime(date) {
      if (typeof date === 'string') {
        return date.slice(0, 5)
      }
      return formatInTimeZone(date, TIME_ZONE, 'HH:mm', {
        locale: ptBR,
      })
    },

    inZonedTime(date) {
      return toZonedTime(new Date(date), TIME_ZONE)
    },
  }
}
