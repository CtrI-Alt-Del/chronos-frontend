import type { CollaboratorWorkLeaveDto } from '@/@core/portal/dtos'
import { MonthInput } from '@/ui/global/widgets/components/month-input'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { WorkLeave } from './work-leave'
import { Avatar } from '@heroui/avatar'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { Pagination } from '@heroui/react'

type Props = {
  collaboratorWorkLeaves: CollaboratorWorkLeaveDto[]
  month: number
  year: number
  monthDays: Date[]
  page: number
  itemsCount: number
  onPageChange: (page: number) => void
  onDateInputChange: (month: number, year: number) => void
}

export const WorkLeaveCalendarPageView = ({
  collaboratorWorkLeaves,
  month,
  year,
  monthDays,
  page,
  itemsCount,
  onPageChange,
  onDateInputChange,
}: Props) => {
  const { inZonedTime } = useDatetime()

  const tableColumns = monthDays.map((day) => (
    <TableColumn key={day.toISOString()} className='border p-0'>
      <div className='w-[40px] pl-3'>{day.getDate().toString().padStart(2, '0')}</div>
    </TableColumn>
  ))
  tableColumns.unshift(
    <TableColumn key='collaborator' className='border'>
      Colaborador
    </TableColumn>,
  )

  function getCollaboratorWorkLeave(collaboratorWorkLeave: CollaboratorWorkLeaveDto) {
    let workLeaveIndex = 0

    function getTableCell(day: Date) {
      const workLeave = collaboratorWorkLeave.workLeaves[workLeaveIndex]
      let workLeaveComponent = null

      if (workLeave) {
        const startedAt = inZonedTime(workLeave.startedAt)
        const endedAt = inZonedTime(workLeave.endedAt)

        if (startedAt.getTime() === day.getTime()) {
          workLeaveIndex++
          workLeaveComponent = (
            <WorkLeave
              description={workLeave.description}
              startedAt={startedAt}
              endedAt={endedAt}
              isVacation={workLeave.isVacation}
            />
          )
        }
      }

      return (
        <TableCell key={day.toISOString()} className='border p-0'>
          <div className='relative'>{workLeaveComponent}</div>
        </TableCell>
      )
    }

    return (
      <TableRow key={collaboratorWorkLeave.collaborator.id} className='border'>
        <TableCell className='flex items-center gap-3 px-3 w-[192px] h-12'>
          <Avatar
            color='primary'
            isBordered
            className='rounded-full size-4'
            radius='sm'
          />
          <span className='text-sm font-medium'>
            {collaboratorWorkLeave.collaborator.name}
          </span>
        </TableCell>
        {...monthDays.map((day) => getTableCell(day))}
      </TableRow>
    )
  }

  return (
    <div className='mt-6'>
      <div className='flex items-center gap-2'>
        <MonthInput year={year} month={month} onChange={onDateInputChange} />
      </div>

      <Table
        bottomContent={
          page > 1 && (
            <div className='flex w-full justify-start'>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={itemsCount}
                onChange={onPageChange}
              />
            </div>
          )
        }
        className='w-[1500px] mt-3'
      >
        <TableHeader className='flex items-center'>{tableColumns}</TableHeader>
        <TableBody>
          {collaboratorWorkLeaves.map((collaboratorWorkLeave) =>
            getCollaboratorWorkLeave(collaboratorWorkLeave),
          )}
        </TableBody>
      </Table>
    </div>
  )
}
