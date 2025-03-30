'use client'

import { Button } from '@heroui/button'
import { FormProvider } from 'react-hook-form'

import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'
import { WeekSchedule } from './week-schedule'
import { DaysOffSchedule } from './days-off-schedule'
import { ScheduleName } from './schedule-name'
import { useSchedulePage } from './use-schedule-page'

type SchedulePageProps = {
  schedule: WorkScheduleDto | null
}

export const SchedulePage = ({ schedule }: SchedulePageProps) => {
  const {
    form,
    isFormFilled,
    isCreatingWorkSchedule,
    handleCreateWorkScheduleButtonClick,
  } = useSchedulePage()

  return (
    <FormProvider {...form}>
      <div className='flex flex-col p-6 rounded-lg border border-gray-border'>
        {!schedule && (
          <Button
            color='primary'
            onPress={handleCreateWorkScheduleButtonClick}
            isDisabled={!isFormFilled || isCreatingWorkSchedule}
            isLoading={isCreatingWorkSchedule}
            className='ml-auto'
          >
            Criar escala
          </Button>
        )}

        <h2 className='font-bold text-lg md:text-xl'>Nome da escala</h2>
        <div className='mt-3'>
          <ScheduleName defaultValue={schedule?.description} />
        </div>

        <h2 className='font-bold text-lg md:text-xl mt-12'>Registro de Horário</h2>
        <div className='flex flex-col my-4 mx-4 md:mx-20 max-w-[480px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-full'>
          <WeekSchedule
            workScheduleId={schedule?.id}
            weekSchedule={schedule?.weekSchedule}
          />
        </div>

        <div className='py-4 max-w-[480px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-full mt-12'>
          <h2 className='font-bold text-lg md:text-xl'>Registro de Dias de Trabalho</h2>
          <div className='mt-3'>
            <DaysOffSchedule
              workScheduleId={schedule?.id}
              defaultDaysOff={schedule?.daysOff}
              defaultDaysOffCount={schedule?.daysOffCount}
              defaultWorkdaysCount={schedule?.workdaysCount}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
