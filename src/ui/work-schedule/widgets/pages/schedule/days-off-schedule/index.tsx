'use client'

import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import { Input } from '@heroui/input'

import { useDaysOffSchedule } from './use-days-off-schedule'

type DaysOffScheduleProps = {
  workScheduleId?: string
  defaultWorkdaysCount?: number
  defaultDaysOffCount?: number
  defaultDaysOff?: string[]
  canEdit?: boolean
}

export const DaysOffSchedule = ({
  workScheduleId,
  defaultWorkdaysCount,
  defaultDaysOffCount,
  defaultDaysOff,
  canEdit = true,
}: DaysOffScheduleProps) => {
  const {
    error,
    workdaysCount,
    daysOffCount,
    isLoading,
    isCalendarEnabled,
    monthDays,
    weekdays,
    daysOff,
    handleEditDaysOffScheduleButtonClick,
    handleWorkdaysCountChange,
    handleDaysOffCountChange,
    handleDaysOffSchedule,
    handleDayButtonClick,
  } = useDaysOffSchedule(
    workScheduleId,
    defaultWorkdaysCount,
    defaultDaysOffCount,
    defaultDaysOff,
  )

  return (
    <div>
      {workScheduleId && (
        <Button
          color='primary'
          onPress={handleEditDaysOffScheduleButtonClick}
          isDisabled={Boolean(error) || isLoading}
          isLoading={isLoading}
          className='my-6 ml-8 text-xs min-w-32 md:ml-auto md:text-sm md:min-w-36'
        >
          Atualizar jornada
        </Button>
      )}
      <div className='flex gap-4 items-end mr-16 mb-4'>
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
          {workScheduleId ? 'Redefinir jornada' : 'Definir Jornada'}
        </Button>
      </div>

      {error && <p className='mx-6 my-2 text-red-500'>{error}</p>}

      <div>
        <div className='flex gap-2 items-center'>
          <span className='block bg-red-500 rounded-lg size-2' />
          <p>Folga</p>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='block rounded-lg bg-slate-200 size-2' />
          <p>Dia de trabalho</p>
        </div>
      </div>

      <div
        className={cn(
          'grid grid-cols-7 gap-2 mt-6',
          canEdit && (!isCalendarEnabled || isLoading) && 'opacity-20 cursor-not-allowed',
          !canEdit && 'pointer-events-none',
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
