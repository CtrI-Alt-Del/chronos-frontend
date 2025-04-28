'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table'
import { Chip, Pagination, Spinner } from '@heroui/react'

import type { TimePunchPeriod } from '@/@core/work-schedule/types'
import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { TimePunchDialog } from '@/ui/work-schedule/widgets/components/time-punch-dialog'
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
const getStatusLabel = (status?: string) => {
  switch (status) {
    case 'day_off':
      return (
        <div className='bg-blue-300 text-white p-1 rounded-md text-center'>FOLGA</div>
      )
    case 'absence':
      return <div className='bg-red-600 text-white p-1 rounded-md text-center'>FALTA</div>
    default:
      return null
  }
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
      className='w-screen md:w-auto'
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
          <div className='flex items-center gap-16 '>
            <span>Entrada 1</span>
            <span>Saída 1</span>
            <span>Entrada 2</span>
            <span>Saída 2</span>
          </div>
        </TableColumn>
        <TableColumn key='status' className='uppercase flex justify-center items-center'>
          <span>Status</span>
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
              <TimePunchDialog
                timePunch={row.timePunch}
                onTimeLogChange={onTimeLogChange}
              />
            </TableCell>
            <TableCell>
              <div className=''>{getStatusLabel(row.status)}</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
