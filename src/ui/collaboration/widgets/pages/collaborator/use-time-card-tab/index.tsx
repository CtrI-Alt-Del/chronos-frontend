import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { Button, Input, Spinner } from '@heroui/react'

import { TimePunchDialog } from '@/ui/work-schedule/widgets/components/time-punch-dialog'
import { useTimeCardTab } from './use-time-card-tab'
import { Time } from '@/ui/work-schedule/widgets/components/time'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import Link from 'next/link'
import { useRest } from '@/ui/global/hooks/use-rest'

const WORKDAY_STATUS: Record<string, string> = {
  normal_day: 'dia normal',
  absence: 'falta',
  day_off: 'folga',
  holiday: 'feriado',
  work_leave: 'afastamento',
}

type TimeCardTabProps = {
  collaboratorId: string
}

export const TimeCardTab = ({ collaboratorId }: TimeCardTabProps) => {
  const { isLoading, timeCard, month, year, handleDateInputChange } = useTimeCardTab(
    collaboratorId,
    new Date(),
  )
  const { workScheduleService } = useRest()
  const { isManager } = useAuthContext()
  const timeCardPdfUrl = workScheduleService.getTimeCardPdfDowloadUrl(
    collaboratorId,
    month,
    year,
  )

  return (
    <div>
      <div className='flex items-center gap-2'>
        <Input
          type='month'
          label='Mês'
          placeholder=''
          defaultValue={`${year}-${String(month).padStart(2, '0')}`}
          onChange={(event) => {
            const [year, month] = event.target.value.split('-').map(Number)
            handleDateInputChange(month, year)
          }}
          className='w-max'
        />
        {isManager && (
          <Button as={Link} href={timeCardPdfUrl} download color='danger'>
            Gerar PDF
          </Button>
        )}
      </div>
      <Table className='mt-3'>
        <TableHeader>
          <TableColumn key='date' className='uppercase'>
            Data
          </TableColumn>
          <TableColumn key='time-punch' className='uppercase'>
            Pontos
          </TableColumn>
          <TableColumn key='workload' className='uppercase'>
            Carga horária
          </TableColumn>
          <TableColumn key='worked-time' className='uppercase'>
            Horas trabalhadas
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
              <TableCell key='workload'>
                <Time>{row.workload}</Time>
              </TableCell>
              <TableCell key='overtime'>
                <Time>{row.overtime}</Time>
              </TableCell>
              <TableCell key='latetime'>
                <Time>{row.latetime}</Time>
              </TableCell>
              <TableCell key='undertime'>
                <Time>{row.undertime}</Time>
              </TableCell>
              <TableCell key='worked-time'>
                <Time>{row.workedTime}</Time>
              </TableCell>
              <TableCell key='hour-bank-credit'>
                <Time>{row.hourBankCredit}</Time>
              </TableCell>
              <TableCell key='hour-bank-debit'>
                <Time>{row.hourBankDebit}</Time>
              </TableCell>
              <TableCell key='work-status'>
                <span className='truncate'>{WORKDAY_STATUS[row.workdayStatus]}</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
