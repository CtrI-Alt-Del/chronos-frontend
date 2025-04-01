'use client'

import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { Input } from '@heroui/input'

import { useDayOffScheduleTab } from './use-day-off-schedule-tab'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'

type DayOffScheduleProps = {
  dayOffSchedule?: DayOffScheduleDto
}

export const DayOffScheduleTab = ({ dayOffSchedule }: DayOffScheduleProps) => {
  const {
    error,
    workdaysCount,
    daysOffCount,
    isLoading,
    isSchedulingDaysOff,
    isCalendarEnabled,
    isSaveButtonDisabled,
    monthDays,
    weekdays,
    daysOff,
    handleSaveButtonClick,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
  } = useDayOffScheduleTab(dayOffSchedule)

  return (
    <div>
      <Button
        color='primary'
        size='md'
        onPress={handleSaveButtonClick}
        isDisabled={isSaveButtonDisabled}
        isLoading={isLoading}
        className='my-6 text-xs min-w-32 md:ml-auto md:text-sm md:min-w-36'
      >
        Salvar jornada
      </Button>

      <div className='flex flex-col mb-4 md:flex-row'>
        <div className='flex gap-2 items-center'>
          <Input
            isRequired
            className='max-w-40 md:max-w-44'
            size='sm'
            type='number'
            label='Dias de Trabalho'
            value={workdaysCount.toString()}
            onChange={(e) => handleWorkdaysCountChange(Number(e.target.value))}
          />
          <span className='self-center'>x</span>
          <Input
            isRequired
            className='max-w-40 md:max-w-44'
            size='sm'
            type='number'
            label='Dias de Folga'
            value={daysOffCount.toString()}
            onChange={(e) => handleDaysOffCountChange(Number(e.target.value))}
          />
        </div>
        <Button
          type='button'
          color='primary'
          onPress={handleDaysOffSchedule}
          isDisabled={Boolean(error) || isSchedulingDaysOff || isLoading}
          isLoading={isSchedulingDaysOff}
          size='md'
          className='mt-6 md:mt-0 min-w-32 md:ml-auto md:text-sm md:min-w-36'
        >
          {dayOffSchedule ? 'Redefinir jornada' : 'Definir Jornada'}
        </Button>
      </div>

      {error && <p className='mx-6 my-2 text-red-500'>{error}</p>}

      <div className='mt-6'>
        <div className='flex items-center gap-2'>
          <span className='block h-2 w-4 rounded-lg bg-red-400' />
          <p className='text-sm text-slate-600'>Folga</p>
        </div>
        <div className='flex items-center gap-2'>
          <span className='block h-2 w-4 rounded-lg bg-gray-400' />
          <p className='text-sm text-slate-600'>Dia de trabalho</p>
        </div>
      </div>

      <div
        className={cn(
          'grid grid-cols-7 gap-2 mt-3',
          (!isCalendarEnabled || isLoading) && 'opacity-20 cursor-not-allowed',
        )}
      >
        <div className='grid grid-cols-7 col-span-7 bg-slate-100'>
          {weekdays.map((weekday) => (
            <span key={weekday} className='px-6 py-2 text-gray-500 uppercase'>
              {weekday}
            </span>
          ))}
        </div>

        {monthDays.map((day, index) => {
          return day ? (
            <Button
              key={String(index)}
              className={cn(
                'p-8 border rounded-xl text-center transition-all bg-slate-200',
                (!isCalendarEnabled || isLoading) && 'pointer-events-none',
                daysOff.includes(day) ? 'bg-red-300' : 'bg-auto',
              )}
              onPress={() => handleDayButtonClick(day)}
            >
              {day.toString()}
            </Button>
          ) : (
            <span key={String(index)} />
          )
        })}
      </div>
    </div>
  )
}
