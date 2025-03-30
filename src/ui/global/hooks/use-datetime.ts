'use client'

import { formatInTimeZone, toZonedTime } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
  subDays,
} from 'date-fns'
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

  function getFirstMonthDayOf(date: Date) {
    return startOfMonth(date)
  }

  function getLastMonthDayOf(date: Date) {
    return startOfMonth(date)
  }

  function getCurrentMonthFirstMonday() {
    const today = new Date()
    const firstDayOfMonth = getFirstMonthDayOf(today)
    const firstWeekDay = getDay(firstDayOfMonth)

    let firstMonday = firstDayOfMonth
    while (firstWeekDay !== 1) {
      firstMonday = plusDays(firstDayOfMonth, firstWeekDay === 0 ? 1 : 8 - firstWeekDay)
    }
    return firstMonday
  }

  function getMonthDaysOf(date: Date) {
    const today = new Date()
    const firstDayOfMonth = startOfMonth(today)
    const daysInMonth = eachDayOfInterval({
      start: firstDayOfMonth,
      end: endOfMonth(today),
    })
    return daysInMonth
  }

  function getWeekdayIndex(date: Date) {
    return getDay(date)
  }

  function getMonthDaysCountOf(date: Date) {
    return getDaysInMonth(date)
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
    minusDays,
    plusDays,
    inZonedTime,
    getFirstMonthDayOf,
    getLastMonthDayOf,
    getMonthDaysOf,
    getCurrentMonthFirstMonday,
    getMonthDaysCountOf,
    getWeekdayIndex,
    getCurrentDate,
  }
}
