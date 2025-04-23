import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { Input, Spinner } from '@heroui/react'

import { TimePunchDialog } from '@/ui/work-schedule/widgets/components/time-punch-dialog'
import { useTimeCardTab } from './use-time-card-tab'

const WORKDAY_STATUS: Record<string, string> = {
  NORMAL_DAY: 'dia normal',
  ABSENCE: 'falta',
  DAY_OFF: 'folga',
  HOLIDAY: 'feriado',
  WORK_LEAVE: 'afastamento',
}

type TimeCardTabProps = {
  collaboratorId: string
}

export const TimeCardTab = ({ collaboratorId }: TimeCardTabProps) => {
  const { isLoading, timeCard, month, year, handleDateInputChange } = useTimeCardTab(
    collaboratorId,
    new Date(),
  )

  return (
    <div>
      <Input
        type='month'
        label='Mês'
        placeholder=''
        defaultValue={`${year}-${String(month).padStart(2, '0')}`}
        onChange={(event) => {
          const [year, month] = event.target.value.split('-').map(Number)
          handleDateInputChange(year, month)
        }}
        className='w-max'
      />
      <Table className='mt-3'>
        <TableHeader>
          <TableColumn key='date' className='uppercase'>
            Data
          </TableColumn>
          <TableColumn key='time-punch' className='uppercase'>
            Pontos
          </TableColumn>
          <TableColumn key='overtime' className='uppercase'>
            Horas extras
          </TableColumn>
          <TableColumn key='latetime' className='uppercase'>
            Horas de atraso
          </TableColumn>
          <TableColumn key='undertime' className='uppercase'>
            Horas faltantes
          </TableColumn>
          <TableColumn key='hour-bank-credit' className='uppercase'>
            Crédito de banco de horas
          </TableColumn>
          <TableColumn key='hour-bank-debit' className='uppercase'>
            Débito de banco de horas
          </TableColumn>
          <TableColumn key='work-status' className='uppercase'>
            Status
          </TableColumn>
        </TableHeader>
        <TableBody
          items={timeCard}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
          emptyContent='Nenhum histórico de trabalho registrado.'
        >
          {(row) => (
            <TableRow key={row.date} className={isLoading ? 'opacity-25' : 'opacity-100'}>
              <TableCell key='name'>{row.date}</TableCell>
              <TableCell key='time-punch'>
                <TimePunchDialog timePunch={row.timePunch} />
              </TableCell>
              <TableCell key='overtime'>{row.overtime}</TableCell>
              <TableCell key='latetime'>{row.latetime}</TableCell>
              <TableCell key='undertime'>{row.undertime}</TableCell>
              <TableCell key='worked-time'>{row.workedTime}</TableCell>
              <TableCell key='hour-bank-credit'>{row.hourBankCredit}</TableCell>
              <TableCell key='hour-bank-debit'>{row.hourBankDebit}</TableCell>
              <TableCell key='work-status'>{WORKDAY_STATUS[row.workStatus]}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
