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
import { useSectorHistoryTable } from './use-sector-history-table'

type SectorHistoryTableProps = {
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

export const SectorHistoryTable = ({
  workdayLogs,
  isLoading,
  page,
  pagesCount,
  onPageChange,
  onTimeLogChange,
}: SectorHistoryTableProps) => {
  const { rows } = useSectorHistoryTable(workdayLogs)

  return (
    <Table
      bottomContentPlacement='outside'
      bottomContent={
        pagesCount > 1 && (
          <div className='flex w-full justify-start'>
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
        <TableColumn key='collaborator' className='uppercase'>
          Colaborador
        </TableColumn>
        <TableColumn key='first-entry' className='uppercase'>
          <div className='flex items-center gap-16'>
            <span>Entrada 1</span>
            <span>Saída 1</span>
            <span>Entrada 2</span>
            <span>Saída 2</span>
          </div>
        </TableColumn>
      </TableHeader>
      <TableBody
        items={rows}
        isLoading={isLoading}
        loadingContent={<Spinner color='primary' label='Carregando...' />}
        emptyContent='Nenhum histórico encontrado.'
        aria-label='pontos'
      >
        {(row) => (
          <TableRow key={row.id} className={isLoading ? 'opacity-25' : 'opacity-100'}>
            <TableCell>{row.date}</TableCell>
            <TableCell>
              <span className='truncate'>{row.collaborator.name}</span>
            </TableCell>
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
