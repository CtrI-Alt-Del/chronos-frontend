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

import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { TimePunchLogDialog } from '@/ui/work-schedule/widgets/components/time-punch-log-dialog'
import { useSectorHistoryTable } from './use-sector-history-table'

type SectorHistoryTableProps = {
  workdayLogs: WorkdayLogDto[]
  isLoading: boolean
  totalPagesCount: number
  page: number
  onPageChange: (page: number) => void
}

export const SectorHistoryTable = ({
  workdayLogs,
  isLoading,
  page,
  totalPagesCount,
  onPageChange,
}: SectorHistoryTableProps) => {
  const { rows } = useSectorHistoryTable(workdayLogs)

  return (
    <Table
      bottomContent={
        totalPagesCount > 1 && (
          <div className='flex w-full justify-start'>
            <Pagination
              aria-label='paginação'
              showControls
              page={page}
              total={totalPagesCount}
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
          Registro de pontos
        </TableColumn>
      </TableHeader>
      <TableBody
        items={rows}
        isLoading={isLoading}
        loadingContent={<Spinner color='primary' label='Carregando...' />}
        emptyContent='Nenhum histórico encontrado.'
        aria-label='counteudo da tabela'
      >
        {(row) => (
          <TableRow key={row.id}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.collaborator.name}</TableCell>
            <TableCell>
              <TimePunchLogDialog
                timePunchLog={row.timePunchLog}
                timePunchSchedule={row.timePunchSchedule}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
