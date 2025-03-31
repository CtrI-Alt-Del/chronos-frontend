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
      <div className='p-6 rounded-lg border border-gray-border w-[21.5rem] md:w-full '>
        <Button color='primary' isLoading={isCreatingWorkSchedule} isDisabled={!isFormFilled} onPress={handleCreateWorkScheduleButtonClick} className='my-6'>
          Cadastrar escala
        </Button>
        <h2 className='text-lg font-bold md:text-xl'>Nome da escala</h2>
        <div className='mt-3'>
          <ScheduleName
            workScheduleId={schedule?.id}
            defaultValue={schedule?.description}
          />
        </div>

        <h2 className='mt-12 text-lg font-bold md:text-xl'>Registro de Horário</h2>
        <div className='flex flex-col mx-auto my-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl'>
          <WeekSchedule
            workScheduleId={schedule?.id}
            weekSchedule={schedule?.weekSchedule}
          />
        </div>

        <div className='py-4 mx-auto mt-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl'>
          <h2 className='text-lg font-bold md:text-xl'>Registro de Dias de Trabalho</h2>
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