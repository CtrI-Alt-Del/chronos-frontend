'use client'

import { Button } from '@heroui/button'

import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { useTimePunchPage } from './use-time-punch-page'
import { TimePunchStepper } from './time-stepper'
import { cn } from '@heroui/theme'

type TimePunchPageProps = {
  workdayLog: WorkdayLogDto
}

export const TimePunchPage = ({ workdayLog }: TimePunchPageProps) => {
  const {
    currentTime,
    completeDate,
    currentPeriod,
    periods,
    step,
    times,
    isClosed,
    isPuchingTime,
    handleTimePunchConfirm,
  } = useTimePunchPage(workdayLog)

  return (
    <div className='flex flex-col justify-center items-center p-6 h-full rounded-lg border border-gray-border'>
      <div className='mb-6 text-3xl font-medium'>
        <p>Bem-vindo(a)</p>
      </div>

      <div className='text-center'>
        <div className='mb-4'>
          <p className='text-2xl font-medium text-gray-500'>{completeDate}</p>
        </div>

        <div className='mb-10'>
          <p className='text-6xl font-medium'>{currentTime}</p>
        </div>

        <TimePunchStepper
          currentStep={step}
          periods={periods}
          isClosed={isClosed}
          times={times}
        />

        <div className='mt-8'>
          <AlertDialog
            title='Confirmação de registro de ponto'
            trigger={
              <Button
                className={cn(
                  'w-64 h-12 mt-12 text-white cursor-pointer bg-primary',
                  isClosed && 'opacity-65 pointer-events-none',
                )}
                disabled={isClosed || isPuchingTime}
                isLoading={isPuchingTime}
              >
                <p className='text-base font-semibold'>
                  {isClosed ? 'Ponto Finalizado' : 'Registrar Ponto'}
                </p>
              </Button>
            }
            onConfirm={handleTimePunchConfirm}
          >
            <div className='mx-auto w-max'>
              <strong className='block w-full text-xl font-normal text-center'>
                {currentPeriod}
              </strong>
              <p className='mt-6 mb-3 text-lg'>
                <strong className='font-semibold'>Seu horário:</strong>
                <time className='mx-auto ml-3 w-max text-3xl font-bold border-b border-slate-900'>
                  {currentTime}
                </time>
              </p>
            </div>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
