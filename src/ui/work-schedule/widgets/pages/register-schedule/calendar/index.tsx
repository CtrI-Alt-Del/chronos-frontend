'use client'

import { Input, Button } from '@heroui/react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addDays,
} from 'date-fns'
import { useState } from 'react'

export const Calendar = () => {
  const [workDays, setWorkDays] = useState(5)
  const [offDays, setOffDays] = useState(2)
  const [selectedDays, setSelectedDays] = useState(new Set())
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const today = new Date()
  const firstDayOfMonth = startOfMonth(today)
  const firstWeekDay = getDay(firstDayOfMonth)
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(today),
  })

  let firstMonday = firstDayOfMonth
  if (firstWeekDay !== 1) {
    firstMonday = addDays(firstDayOfMonth, firstWeekDay === 0 ? 1 : 8 - firstWeekDay)
  }

  const handleDefineSchedule = () => {
    if (workDays + offDays !== 7) {
      setError('A soma dos dias de trabalho e folga deve ser igual a 7.')
      return
    }

    setError(null)
    setIsCalendarEnabled(true)
    const newSelectedDays = new Set()

    let currentDay = firstMonday

    while (currentDay <= endOfMonth(today)) {
      for (let i = 0; i < workDays && currentDay <= endOfMonth(today); i++) {
        currentDay = addDays(currentDay, 1)
      }

      for (let i = 0; i < offDays && currentDay <= endOfMonth(today); i++) {
        newSelectedDays.add(format(currentDay, 'yyyy-MM-dd'))
        currentDay = addDays(currentDay, 1)
      }
    }

    let firstSaturday: unknown = null
    let firstSunday: unknown = null

    daysInMonth.forEach((day) => {
      const formattedDate = format(day, 'yyyy-MM-dd')
      const dayOfWeek = getDay(day)

      if (dayOfWeek === 6 && !firstSaturday) {
        firstSaturday = formattedDate
        newSelectedDays.add(firstSaturday)
      }

      if (dayOfWeek === 0 && !firstSunday) {
        firstSunday = formattedDate
        newSelectedDays.add(firstSunday)
      }
    })

    setSelectedDays(newSelectedDays)
  }

  const handleChange = (type: 'work' | 'off', value: number) => {
    if (error) setError(null)

    if (type === 'work') {
      setWorkDays(value)
    } else {
      setOffDays(value)
    }
  }

  const toggleDay = (date: string) => {
    if (!isCalendarEnabled) return
    const newSelectedDays = new Set(selectedDays)
    if (newSelectedDays.has(date)) {
      newSelectedDays.delete(date)
    } else {
      newSelectedDays.add(date)
    }
    setSelectedDays(newSelectedDays)
  }

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <div className='px-6 py-4'>
      <div className='flex gap-4 mb-4 items-end ml-6 mr-16'>
        <Input
          isRequired
          className='max-w-40 md:max-w-44'
          size='sm'
          type='number'
          label='Dias de Trabalho'
          value={workDays.toString()}
          onChange={(e) => handleChange('work', Number(e.target.value))}
        />
        <span className='self-center'>x</span>
        <Input
          isRequired
          className='max-w-40 md:max-w-44'
          size='sm'
          type='number'
          label='Dias de Folga'
          value={offDays.toString()}
          onChange={(e) => handleChange('off', Number(e.target.value))}
        />
        <Button
          color='primary'
          onPress={handleDefineSchedule}
          isDisabled={!!error}
          className='ml-8 text-xs min-w-32 md:ml-auto md:text-sm md:min-w-36'
        >
          Definir Jornada
        </Button>
      </div>

      {error && <p className='text-red-500 mx-6 my-2'>{error}</p>}

      <div>
        <div className='grid grid-cols-7 gap-2 text-center font-bold mb-2 bg-gray-100'>
          {weekDays.map((day) => (
            <div key={day} className='p-2'>
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-2'>
          {Array.from({ length: firstWeekDay }).map((_, index) => (
            <div key={`empty-${index}`} className='p-4' />
          ))}

          {daysInMonth.map((day, index) => {
            const formattedDate = format(day, 'yyyy-MM-dd')
            const isOffDay = selectedDays.has(formattedDate)

            const isFirstSaturday = firstWeekDay === 6 && index === 0
            const isFirstSunday = firstWeekDay === 6 && index === 1
            const isFirstSundayOnly = firstWeekDay === 0 && index === 1

            const isFirstWeekend = isFirstSaturday || isFirstSunday || isFirstSundayOnly

            return (
              <div
                key={formattedDate}
                onClick={() => toggleDay(formattedDate)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleDay(formattedDate)
                  }
                }}
                className={`p-6 border rounded-xl text-center transition-all 
                ${isOffDay ? 'bg-red-300' : 'bg-gray-200'} // Dia off ou normal
                ${isFirstWeekend && !isOffDay ? 'bg-gray-200' : ''} // Aplica fundo cinza quando o primeiro final de semana não for selecionado
                ${isFirstWeekend && isOffDay ? 'bg-red-300' : ''} // Aplica fundo vermelho quando o primeiro final de semana for selecionado
                ${isCalendarEnabled ? 'cursor-pointer' : 'cursor-not-allowed'} // Habilita o clique para qualquer dia
              `}
              >
                {format(day, 'd')}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
