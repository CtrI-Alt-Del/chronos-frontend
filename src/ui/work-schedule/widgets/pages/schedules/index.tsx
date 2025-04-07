'use client'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import Link from 'next/link'

import { WorkScheduleCard } from './work-schedule-card'
import { useSchedulesPage } from './use-schedules-page'
import { WorkScheduleCardSckeleton } from './work-schedule-card-skeleton'
import { ROUTES } from '@/constants/routes'

export const SchedulesPage = () => {
  const { schedules, isFetchingSchedules } = useSchedulesPage()

  return (
    <div className='p-10 rounded-lg border border-gray-border'>
      <div className='flex flex-col justify-between md:flex-row'>
        <div className='flex max-w-[280px]'>
          <Input
            label={
              <span className='text-lg font-bold text-blue-500'>Nome da Escala</span>
            }
            placeholder='Buscar horários...'
            variant='underlined'
            color='primary'
            labelPlacement='outside'
            className='pl-2 text-xl input-label'
          />
        </div>

        <div className='flex mt-6'>
          <Button
            as={Link}
            href={ROUTES.workSchedule.schedule()}
            color='primary'
            className='px-6 py-5'
          >
            Registrar Escala
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 place-items-center mt-10 w-full sm:px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isFetchingSchedules ? (
          <>
            <WorkScheduleCardSckeleton />
            <WorkScheduleCardSckeleton />
            <WorkScheduleCardSckeleton />
            <WorkScheduleCardSckeleton />
          </>
        ) : (
          <>
            {schedules && schedules.length > 0 ? (
              schedules?.map((schedule) => (
                <WorkScheduleCard key={schedule.id} schedule={schedule} />
              ))
            ) : (
              <p className='text-gray-500'>Nenhuma escala encontrada.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
