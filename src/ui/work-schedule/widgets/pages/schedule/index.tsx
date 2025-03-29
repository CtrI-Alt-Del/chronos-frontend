import { Button } from '@heroui/button'
import Link from 'next/link'

import { Calendar } from './calendar'
import { WeekSchedule } from './week-schedule'
import type { WorkScheduleDto } from '@/@core/work-schedule/dtos'

type SchedulePageProps = {
  schedule: WorkScheduleDto | null
}

export const SchedulePage = ({ schedule }: SchedulePageProps) => {
  return (
    <div className='p-6 rounded-lg border border-gray-border'>
      <h2 className='font-bold text-lg md:text-xl'>Registro de Horário</h2>
      <div className='flex flex-col my-4 mx-4 md:mx-20 max-w-[480px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-full'>
        <WeekSchedule />
      </div>

      <div className='py-4 max-w-[480px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-full mt-6'>
        <h2 className='font-bold text-lg md:text-xl'>Registro de Dias de Trabalho</h2>
        <Calendar />
      </div>

      <div className='flex justify-end mr-[88px]'>
        <Button as={Link} href='' color='primary' className='px-6 py-5 text-lg'>
          Confirmar
        </Button>
      </div>
    </div>
  )
}
