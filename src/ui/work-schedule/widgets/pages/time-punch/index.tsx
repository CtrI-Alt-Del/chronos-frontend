'use client'

import { TimePunchStepper } from './time-stepper'
import { Button } from '@heroui/button'
import { Avatar } from '@heroui/avatar'
import { useTimePunchPage } from './use-time-punch-page'
import { useDatetime } from '@/ui/global/hooks/useDatetime'

export const TimePunchPage = () => {
  const { currentTime, currentStep, isComplete, handlePunchRegister } = useTimePunchPage()
  const { formatCompleteDate, formatTime } = useDatetime()

  return (
    <div className='flex justify-center items-center p-6 h-full rounded-lg border border-gray-border'>
      <div className='text-center'>
        <Avatar
          alt='User'
          className='mx-auto mb-10 w-36 h-36'
          radius='md'
          color='primary'
          isBordered
        />
        <div className='mb-14 text-2xl font-medium'>
          <p>Bem-vindo, Thigszin!</p>
        </div>
        <div className='mb-4'>
          <p className='text-lg font-medium text-gray-500'>
            {formatCompleteDate(currentTime)}
          </p>
        </div>
        <div className='mb-10'>
          <p className='text-5xl font-medium'>{formatTime(currentTime)}</p>
        </div>
        <TimePunchStepper currentStep={currentStep} complete={isComplete} />
        <div className='mt-8'>
          <Button
            className='w-52 h-12 text-white cursor-pointer bg-primary'
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
