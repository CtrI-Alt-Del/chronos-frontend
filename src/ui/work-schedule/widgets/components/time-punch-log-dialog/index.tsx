import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'

import type { TimePunchDto } from '@/@core/work-schedule/dtos'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Button } from '@heroui/button'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { TimeLog } from './time-log'
import { Time } from '../time'
import { TimeInput } from '../time-input'
import { TimeLogInput } from './time-log-input'

type TimePunchLogDialogProps = {
  timePunchLog: TimePunchDto
  timePunchSchedule: TimePunchDto
}

export const TimePunchLogDialog = ({
  timePunchLog,
  timePunchSchedule,
}: TimePunchLogDialogProps) => {
  return (
    <Dialog
      title='Registro de ponto'
      size='3xl'
      trigger={
        <Button variant='light'>
          <ol className='flex items-center gap-3'>
            <li>
              <TimeLog time={timePunchLog.firstClockIn} />
            </li>
            <li>
              <TimeLog time={timePunchLog.firstClockOut} />
            </li>
            <li>
              <TimeLog time={timePunchLog.secondClockIn} />
            </li>
            <li>
              <TimeLog time={timePunchLog.secondClockIn} />
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
              <TableColumn key='collaborator' className='uppercase'>
                Escalado
              </TableColumn>
              <TableColumn key='first-entry' className='uppercase'>
                Registrado
              </TableColumn>
            </TableHeader>
            <TableBody aria-label='counteudo da tabela'>
              <TableRow key='first-clock-in'>
                <TableCell>Entrada 1</TableCell>
                <TableCell>{timePunchSchedule.firstClockIn}</TableCell>
                <TableCell>
                  <TimeLogInput defaultValue={timePunchLog.firstClockIn} />
                </TableCell>
              </TableRow>
              <TableRow key='first-clock-out'>
                <TableCell>Saída 1</TableCell>
                <TableCell>{timePunchSchedule.firstClockOut}</TableCell>
                <TableCell>
                  <TimeLogInput defaultValue={timePunchLog.firstClockOut} />
                </TableCell>
              </TableRow>
              <TableRow key='second-clock-in'>
                <TableCell>Entrada 2</TableCell>
                <TableCell>{timePunchSchedule.secondClockIn}</TableCell>
                <TableCell>
                  <TimeLogInput defaultValue={timePunchLog.secondClockIn} />
                </TableCell>
              </TableRow>
              <TableRow key='second-clock-out'>
                <TableCell>Saída 2</TableCell>
                <TableCell>{timePunchSchedule.secondClockOut}</TableCell>
                <TableCell>
                  <TimeLogInput defaultValue={timePunchLog.secondClockOut} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </Dialog>
  )
}
