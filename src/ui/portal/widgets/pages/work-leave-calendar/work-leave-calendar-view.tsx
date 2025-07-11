import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table'
import { Pagination } from '@heroui/react'
import { Avatar } from '@heroui/avatar'

import type { CollaboratorWorkLeaveDto } from '@/@core/portal/dtos'
import { MonthInput } from '@/ui/global/widgets/components/month-input'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { Search } from '@/ui/global/widgets/components/search'
import { WorkLeave } from './work-leave'

type Props = {
  collaboratorWorkLeaves: CollaboratorWorkLeaveDto[]
  month: number
  year: number
  monthDays: Date[]
  page: number
  itemsCount: number
  pagesCount: number
  onCollaboratorNameChange: (collaboratorName: string) => void
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
  pagesCount,
  onCollaboratorNameChange,
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

        if (
          startedAt.getMonth() === day.getMonth() &&
          startedAt.getDate() === day.getDate()
        ) {
          workLeaveIndex++
          workLeaveComponent = (
            <WorkLeave
              description={workLeave.description}
              startedAt={startedAt}
              endedAt={endedAt}
              isVacation={workLeave.isVacation}
              justification={workLeave.justification}
              overlapsMonthStart={endedAt.getMonth() !== day.getMonth()}
              overlapsMothEnd={false}
            />
          )
        } else if (
          startedAt.getMonth() !== day.getMonth() &&
          endedAt.getMonth() === day.getMonth() &&
          day.getDate() <= endedAt.getDate()
        ) {
          workLeaveIndex++
          workLeaveComponent = (
            <WorkLeave
              description={workLeave.description}
              startedAt={startedAt}
              endedAt={endedAt}
              isVacation={workLeave.isVacation}
              justification={workLeave.justification}
              overlapsMonthStart={false}
              overlapsMothEnd={true}
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
        <Search placeholder='Pesquisar colaborador' onChange={onCollaboratorNameChange} />
      </div>

      <div className='w-[calc(100vw-20rem)] overflow-x-auto rounded-md'>
        <Table
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
          className='w-[1500px] mt-3 overflow-x-auto'
        >
          <TableHeader className='flex items-center'>{tableColumns}</TableHeader>
          <TableBody>
            {collaboratorWorkLeaves.map((collaboratorWorkLeave) =>
              getCollaboratorWorkLeave(collaboratorWorkLeave),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
