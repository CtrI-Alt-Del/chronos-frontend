'use client'

import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/table'
import { Button } from '@heroui/button'
import { Controller } from 'react-hook-form'

import { ReplicateWeekdayScheduleDialog } from './replicate-weeday-schedule-dialog'
import { WEEKDAYS } from '@/constants'
import { Icon } from '@/ui/global/widgets/components/Icon'
import type { WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { useWeekdaysSorter } from './use-weekday-sorter'
import { TimeInput } from '../../../../../work-schedule/widgets/components/time-input'
import { useWeekScheduleTab } from './use-week-schedule-tab'

type WeekScheduleProps = {
  weekSchedule?: WeekdayScheduleDto[]
  collaboratorId?: string
}

export const WeekScheduleTab = ({ weekSchedule, collaboratorId }: WeekScheduleProps) => {
  const weekdaysSchedule = useWeekdaysSorter(weekSchedule)
  const {
    formControl,
    isEditing,
    isFormDirty,
    handleFormSubmit,
    handleWeekdayScheduleReplicate,
    handleRemoveWeekdayScheduleButtonClick,
  } = useWeekScheduleTab(weekdaysSchedule, collaboratorId)

  return (
    <form
      className='flex flex-col mx-auto w-max md:w-[64rem]'
      onSubmit={handleFormSubmit}
    >
      <Button
        type='submit'
        color='primary'
        isDisabled={isEditing || !isFormDirty}
        isLoading={isEditing}
        className='self-end mb-3'
      >
        Salvar horário
      </Button>

      <Table className='w-screen md:w-auto'>
        <TableHeader>
          <TableColumn className='text-md'>Dia</TableColumn>
          <TableColumn className='text-md'>Entrada 1</TableColumn>
          <TableColumn className='text-md'>Saída 1</TableColumn>
          <TableColumn className='text-md'>Entrada 2</TableColumn>
          <TableColumn className='text-md'>Saída 2</TableColumn>
        </TableHeader>
        <TableBody>
          {Object.entries(WEEKDAYS).map(([weekdayValue, weekdayName], index) => (
            <TableRow key={weekdayValue}>
              <TableCell>{weekdayName}</TableCell>
              <TableCell>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunch.firstClockIn`}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TimeInput key={value} hasIcon value={value} onChange={onChange} />
                    )
                  }}
                />
              </TableCell>
              <TableCell>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunch.firstClockOut`}
                  render={({ field: { value, onChange } }) => (
                    <TimeInput key={value} hasIcon value={value} onChange={onChange} />
                  )}
                />
              </TableCell>
              <TableCell>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunch.secondClockIn`}
                  render={({ field: { value, onChange } }) => (
                    <TimeInput key={value} hasIcon value={value} onChange={onChange} />
                  )}
                />
              </TableCell>
              <TableCell className='flex items-center'>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunch.secondClockOut`}
                  render={({ field: { value, onChange } }) => (
                    <TimeInput key={value} hasIcon value={value} onChange={onChange} />
                  )}
                />
                <ReplicateWeekdayScheduleDialog
                  onWeekdaysReplicate={(weekdays) =>
                    handleWeekdayScheduleReplicate(weekdays, weekdayValue)
                  }
                />
                <Button
                  isIconOnly
                  variant='light'
                  onPress={() => handleRemoveWeekdayScheduleButtonClick(weekdayValue)}
                >
                  <Icon name='trash' size={16} className='text-slate-500' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  )
}
