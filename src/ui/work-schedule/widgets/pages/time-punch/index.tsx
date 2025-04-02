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
    <div className='flex flex-col justify-center items-center p-4 h-full rounded-lg border md:p-6 border-gray-border'>
      <div className='mb-4 text-2xl font-medium text-center md:mb-6 md:text-3xl'>
        <p>Bem-vindo(a), {collaborationName}!</p>
      </div>

      <div className='text-center'>
        <div className='mb-2 md:mb-4'>
          <p className='text-xl font-medium text-gray-500 md:text-2xl'>{completeDate}</p>
        </div>

        <div className='mb-6 md:mb-10'>
          <p className='text-4xl font-medium md:text-6xl'>{currentTime}</p>
        </div>

        <TimePunchStepper
          currentStep={step}
          periods={periods}
          isClosed={isClosed}
          timesSchedule={timesSchedule}
          timesLog={timesLog}
        />

        <div className='mt-6 md:mt-8'>
          <AlertDialog
            title='Confirmação de registro de ponto'
            trigger={
              <Button
                className={cn(
                  'w-full md:w-64 h-10 md:h-12 mt-8 md:mt-12 text-white cursor-pointer bg-primary',
                  isClosed && 'opacity-65 pointer-events-none',
                )}
                disabled={isClosed || isPuchingTime}
                isLoading={isPuchingTime}
              >
                <p className='text-sm font-semibold md:text-base'>
                  {isClosed ? 'Ponto Finalizado' : 'Registrar Ponto'}
                </p>
              </Button>
            }
            onConfirm={handleTimePunchLogConfirm}
          >
            <div className='mx-auto w-max'>
              <p className='text-base md:text-lg'>
                <strong className='font-normal'>{currentPeriod}</strong>:{' '}
                <time className='ml-1 border-b border-slate-900'>
                  {currentTimeSchedule}
                </time>
              </p>
              <p className='mt-2 mb-2 text-base md:mt-3 md:mb-3 md:text-lg'>
                <strong className='font-semibold'>Seu horário:</strong>
                <time className='mx-auto ml-2 w-max text-2xl font-bold border-b md:ml-3 md:text-3xl border-slate-900'>
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
