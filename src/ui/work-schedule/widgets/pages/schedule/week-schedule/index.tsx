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

import { TimeInput } from '../../../components/time-input'
import { useWeekSchedule } from './use-week-schedule'
import { ReplicateWeekdayScheduleDialog } from './replicate-weeday-schedule-dialog'
import { WEEKDAYS } from '@/constants'
import { Icon } from '@/ui/global/widgets/components/Icon'

export const WeekSchedule = () => {
  const {
    formControl,
    handleFormSubmit,
    handleWeekdayScheduleReplicate,
    handleRemoveWeekdayScheduleButtonClick,
  } = useWeekSchedule()

  return (
    <form className='flex flex-col w-full' onSubmit={handleFormSubmit}>
      <Button type='submit' color='primary' className='self-end'>
        Salvar horário
      </Button>

      <Table className='mt-6'>
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
                  name={`weekdaysSchedule.${index}.timePunchSchedule.firstClockIn`}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <TimeInput
                        key={value}
                        hasIcon
                        defaultValue={value}
                        onChange={onChange}
                      />
                    )
                  }}
                />
              </TableCell>
              <TableCell>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunchSchedule.firstClockOut`}
                  render={({ field: { value, onChange } }) => (
                    <TimeInput
                      key={value}
                      hasIcon
                      defaultValue={value}
                      onChange={onChange}
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunchSchedule.secondClockIn`}
                  render={({ field: { value, onChange } }) => (
                    <TimeInput
                      key={value}
                      hasIcon
                      defaultValue={value}
                      onChange={onChange}
                    />
                  )}
                />
              </TableCell>
              <TableCell className='flex items-center'>
                <Controller
                  control={formControl}
                  name={`weekdaysSchedule.${index}.timePunchSchedule.secondClockOut`}
                  render={({ field: { value, onChange } }) => (
                    <TimeInput
                      key={value}
                      hasIcon
                      defaultValue={value}
                      onChange={onChange}
                    />
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
