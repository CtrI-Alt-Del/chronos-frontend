'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table'
import { Button, Chip, Pagination, Spinner } from '@heroui/react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { TimePunchDialog } from '@/ui/work-schedule/widgets/components/time-punch-dialog'
import { useCollaboratorHistoryTable } from './use-collaborator-history-table'
import { CreateExcuseAbsenceSolicitationModal } from '../create-excuse-absence-modal'
import { useRef } from 'react'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

type CollaboratorHistoryTableProps = {
  workdayLogs: WorkdayLogDto[]
  isLoading: boolean
  page: number
  pagesCount: number
  onPageChange: (page: number) => void
  onTimeLogChange: (
    workdayLogDate: Date,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ) => void
}

const getStatusLabel = (status?: string) => {
  switch (status) {
    case 'day_off':
      return (
        <Chip variant='flat' color='default'>
          FOLGA
        </Chip>
      )
    case 'absence':
      return (
        <Chip variant='flat' color='danger'>
          FALTA
        </Chip>
      )
    case 'normal_day':
      return (
        <Chip variant='flat' color='primary'>
          DIA NORMAL
        </Chip>
      )
    case 'excused_absence':
      return (
        <Chip variant='flat' color='warning'>
          FALTA ABONADA
        </Chip>
      )
    case 'vacation':
      return (
        <Chip variant='flat' color='success'>
          FÉRIAS
        </Chip>
      )
    case 'work_leave':
      return (
        <Chip variant='flat' color='secondary'>
          AFASTAMENTO
        </Chip>
      )
    case 'holiday':
      return (
        <Chip variant='flat' color='success'>
          FERIADO
        </Chip>
      )
    default:
      return (
        <Chip variant='flat' color='warning'>
          `{status}`
        </Chip>
      )
  }
}
export const CollaboratorHistoryTable = ({
  workdayLogs,
  isLoading,
  page,
  pagesCount,
  onPageChange,
  onTimeLogChange,
}: CollaboratorHistoryTableProps) => {
  const dialogRef = useRef<DialogRef>(null)
  const { rows, dateBeingExcused, handleCreateExcuseAbsenceSolicitationButtonClick } =
    useCollaboratorHistoryTable(workdayLogs, dialogRef)
  const { parseDate } = useDatetime()

  return (
    <div>
      <Table
        className='w-screen md:w-auto'
        bottomContentPlacement='outside'
        bottomContent={
          pagesCount > 1 && (
            <div className='flex justify-start w-full'>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={pagesCount}
                onChange={onPageChange}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn key='date' className='uppercase'>
            Data
          </TableColumn>
          <TableColumn key='time-punch' className='uppercase'>
            Registros de Ponto
          </TableColumn>
          <TableColumn
            key='status'
            className='flex justify-center items-center uppercase'
          >
            Status
          </TableColumn>
          <TableColumn>{null}</TableColumn>
        </TableHeader>
        <TableBody
          items={rows}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' label='Carregando...' />}
          emptyContent='Nenhum histórico encontrado.'
          aria-label='conteúdo da tabela'
        >
          {(row) => (
            <TableRow key={row.id} className={isLoading ? 'opacity-25' : 'opacity-100'}>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <TimePunchDialog
                  timePunch={row.timePunch}
                  onTimeLogChange={(time, period) =>
                    onTimeLogChange(parseDate(row.date), time, period)
                  }
                />
              </TableCell>
              <TableCell>
                <div className='flex justify-center items-center space-x-3'>
                  {getStatusLabel(row.status)}
                </div>
              </TableCell>
              <TableCell>
                {row.status === 'absence' && (
                  <Button
                    type='button'
                    size='sm'
                    color='primary'
                    className='text-sm text-white  font-medium whitespace-nowrap p-1 rounded-md min-w-[120px]'
                    onPress={() =>
                      handleCreateExcuseAbsenceSolicitationButtonClick(row.date)
                    }
                  >
                    Pedir abono
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CreateExcuseAbsenceSolicitationModal
        workDayLogDate={dateBeingExcused ?? ''}
        ref={dialogRef}
      />
    </div>
  )
}
