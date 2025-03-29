'use client'

import { Button } from '@heroui/button'
import { useDaysOffSchedule } from './use-days-off-schedule'
import { cn, spacer } from '@heroui/theme'
import { Input } from '@heroui/input'

export const DaysOffSchedule = () => {
  const {
    error,
    workdaysCount,
    daysOffCount,
    isLoading,
    isCalendarEnabled,
    monthDays,
    weekdays,
    daysOff,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
  } = useDaysOffSchedule()

  return (
    <div>
      <div className='flex gap-4 mb-4 items-end mr-16'>
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
        <Button
          color='primary'
          onPress={handleDaysOffSchedule}
          isDisabled={Boolean(error) || isLoading}
          isLoading={isLoading}
          className='ml-8 text-xs min-w-32 md:ml-auto md:text-sm md:min-w-36'
        >
          Definir Jornada
        </Button>
      </div>

      {error && <p className='text-red-500 mx-6 my-2'>{error}</p>}

      <div
        className={cn(
          'grid grid-cols-7 gap-2',
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
