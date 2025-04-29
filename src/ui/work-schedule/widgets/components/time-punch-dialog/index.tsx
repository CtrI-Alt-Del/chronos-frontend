import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { Button } from '@heroui/button'
import { useRef } from 'react'

import type { TimePunchDto } from '@/@core/work-schedule/dtos'
import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'
import { useTimePunchDialog } from './use-time-punch-dialog'
import { TimeLog } from './time-log'
import { TimeLogInput } from './time-log-input'

type TimePunchDialogProps = {
  timePunch: TimePunchDto
  onTimeLogChange?: (time: string, period: TimePunchPeriod) => void
}

export const TimePunchDialog = ({ timePunch, onTimeLogChange }: TimePunchDialogProps) => {
  const dialogRef = useRef<DialogRef>(null)
  const { handleTimeLogChange } = useTimePunchDialog(dialogRef, onTimeLogChange)

  return (
    <Dialog
      ref={dialogRef}
      title='Registro de ponto'
      size='3xl'
      trigger={
        <Button variant='light'>
          <ol className='flex items-center gap-3'>
            <li className='w-24'>
              <TimeLog time={timePunch.firstClockIn} />
            </li>
            <li className='w-24'>
              <TimeLog time={timePunch.firstClockOut} />
            </li>
            <li className='w-24'>
              <TimeLog time={timePunch.secondClockIn} />
            </li>
            <li className='w-24'>
              <TimeLog time={timePunch.secondClockOut} />
            </li>
          </ol>
        </Button>
      }
    >
      {() => (
        <div className='pb-6'>
          <Table>
            <TableHeader>
              <TableColumn key='date' className='uppercase'>
                Período
              </TableColumn>
              <TableColumn key='first-entry' className='uppercase'>
                Registrado
              </TableColumn>
            </TableHeader>
            <TableBody aria-label='counteudo da tabela' className='text-sm'>
              <TableRow key='first-clock-in'>
                <TableCell>Entrada 1</TableCell>
                <TableCell>
                  <TimeLogInput
                    defaultValue={timePunch.firstClockIn}
                    onChange={(timeLog) => handleTimeLogChange(timeLog, 'first_clock_in')}
                  />
                </TableCell>
              </TableRow>
              <TableRow key='first-clock-out'>
                <TableCell>Saída 1</TableCell>
                <TableCell>
                  <TimeLogInput
                    defaultValue={timePunch.firstClockOut}
                    onChange={(timeLog) =>
                      handleTimeLogChange(timeLog, 'first_clock_out')
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow key='second-clock-in'>
                <TableCell>Entrada 2</TableCell>
                <TableCell>
                  <TimeLogInput
                    defaultValue={timePunch.secondClockIn}
                    onChange={(timeLog) =>
                      handleTimeLogChange(timeLog, 'second_clock_in')
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow key='second-clock-out'>
                <TableCell>Saída 2</TableCell>
                <TableCell>
                  <TimeLogInput
                    defaultValue={timePunch.secondClockOut}
                    onChange={(timeLog) =>
                      handleTimeLogChange(timeLog, 'second_clock_out')
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </Dialog>
  )
}
