'use client'

import { TimePunchStepper } from './time-stepper'
import { Button } from '@heroui/button'
import { useTimePunchPage } from './use-time-punch-page'
import { useDatetime } from '@/ui/global/hooks/use-date-time'

export const TimePunchPage = () => {
  const { currentTime, currentStep, isComplete, handlePunchRegister } = useTimePunchPage()
  const { formatCompleteDate, formatTime } = useDatetime()

  return (
    <div className='flex flex-col justify-center items-center p-6 h-full rounded-lg border border-gray-border'>
      <div className='mb-6 text-3xl font-medium'>
        <p>Bem-vindo(a), Thigszin!</p>
      </div>

      <div className='text-center'>
        <div className='mb-4'>
          <p className='text-2xl font-medium text-gray-500'>
            {formatCompleteDate(currentTime)}
          </p>
        </div>

        <div className='mb-10'>
          <p className='text-6xl font-medium'>{formatTime(currentTime)}</p>
        </div>

        <TimePunchStepper currentStep={currentStep} complete={isComplete} />

        <div className='mt-8'>
          <Button
            className='w-64 h-12 mt-12 text-white cursor-pointer bg-primary'
            onPress={handlePunchRegister}
            disabled={isComplete}
          >
            <p className='text-lg font-semibold'>
              {isComplete ? 'Ponto Finalizado' : 'Registrar Ponto'}
            </p>
          </Button>
        </div>
      </div>
    </div>
  )
}
