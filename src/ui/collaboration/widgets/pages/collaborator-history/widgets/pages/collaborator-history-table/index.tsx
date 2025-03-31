'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table'
import { Pagination, Spinner } from '@heroui/react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { TimePunchLogDialog } from '@/ui/work-schedule/widgets/components/time-punch-log-dialog'
import { useCollaboratorHistoryTable } from './use-collaborator-history-table'

type CollaboratorHistoryTableProps = {
  workdayLogs: WorkdayLogDto[]
  isLoading: boolean
  page: number
  pagesCount: number
  onPageChange: (page: number) => void
  onTimeLogChange: (
    timePunchLogId: string,
    timeLog: string,
    timePunchPeriod: TimePunchPeriod,
  ) => void
}

export const CollaboratorHistoryTable = ({
  workdayLogs,
  isLoading,
  page,
  pagesCount,
  onPageChange,
  onTimeLogChange,
}: CollaboratorHistoryTableProps) => {
  const { rows } = useCollaboratorHistoryTable(workdayLogs)

  return (
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
              <TimePunchLogDialog
                timePunchLog={row.timePunchLog}
                timePunchSchedule={row.timePunchSchedule}
                onTimeLogChange={onTimeLogChange}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
