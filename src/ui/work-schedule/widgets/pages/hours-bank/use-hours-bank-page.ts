'use client'

import { useState, useEffect } from 'react'

export interface HoursBankData {
  id: string
  date: string
  workedHours: string
  scheduledHours: string
  balance: string
}

export function useHoursBankPage(collaboratorId: string, startDate: Date, endDate: Date) {
  const [isLoading, setIsLoading] = useState(true)
  const [hoursBankData, setHoursBankData] = useState<HoursBankData[]>([])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockData: HoursBankData[] = [
          {
            id: '1',
            date: '01/04/2023',
            workedHours: '08:00',
            scheduledHours: '08:00',
            balance: '00:00',
          },
          {
            id: '2',
            date: '02/04/2023',
            workedHours: '09:00',
            scheduledHours: '08:00',
            balance: '+01:00',
          },
          {
            id: '3',
            date: '03/04/2023',
            workedHours: '07:30',
            scheduledHours: '08:00',
            balance: '-00:30',
          },
        ]

        setHoursBankData(mockData)
      } catch (error) {
        console.error('Erro ao carregar dados do banco de horas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [collaboratorId])

  const currentBalance = '+04:07'
  const hoursWorkedToday = '08:06'
  const totalHoursWorked = '36:09'
  const recentEntries = Array(8).fill({
    date: '04/04/2025',
    entryTime: '08:00',
    exitTime: '17:00',
    total: '09:00',
  })

  return {
    isLoading,
    hoursBankData,
    currentBalance,
    hoursWorkedToday,
    totalHoursWorked,
    recentEntries,
  }
}
