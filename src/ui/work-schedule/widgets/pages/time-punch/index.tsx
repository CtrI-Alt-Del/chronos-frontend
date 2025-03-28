'use client'

import { Button } from '@heroui/button'

import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { useTimePunchPage } from './use-time-punch-page'
import { TimePunchStepper } from './time-stepper'
import { cn } from '@heroui/theme'

type TimePunchPageProps = {
  workdayLog: WorkdayLogDto
  collaborationName: string
}

export const TimePunchPage = ({ workdayLog, collaborationName }: TimePunchPageProps) => {
  const {
    currentTime,
    completeDate,
    currentPeriod,
    currentTimeSchedule,
    periods,
    step,
    timesLog,
    isClosed,
    timesSchedule,
    isPuchingTime,
    handlePunchRegister,
    handleTimePunchLogConfirm,
  } = useTimePunchPage(workdayLog)

  return (
    <div className='flex flex-col justify-center items-center p-6 h-full rounded-lg border border-gray-border'>
      <div className='mb-6 text-3xl font-medium'>
        <p>Bem-vindo(a), {collaborationName}!</p>
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
          timesSchedule={timesSchedule}
          timesLog={timesLog}
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
            onConfirm={handleTimePunchLogConfirm}
          >
            <div className='mx-auto w-max'>
              <p className='text-lg'>
                <strong className='font-normal'>{currentPeriod}</strong>:{' '}
                <time className='ml-1 border-b border-slate-900'>
                  {currentTimeSchedule}
                </time>
              </p>
              <p className='text-lg mt-3 mb-3'>
                <strong className='font-semibold'>Seu horário:</strong>
                <time className='ml-3 mx-auto w-max text-3xl font-bold border-b border-slate-900'>
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
