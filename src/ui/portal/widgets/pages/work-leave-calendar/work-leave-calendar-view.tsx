import type { WorkLeaveCalendarDto } from '@/@core/portal/dtos'
import { MonthInput } from '@/ui/global/widgets/components/month-input'

type Props = {
  workLeaveCalendar: WorkLeaveCalendarDto[]
  month: number
  year: number
  handleDateInputChange: (month: number, year: number) => void
}

export const WorkLeaveCalendarPageView = ({
  workLeaveCalendar,
  month,
  year,
  handleDateInputChange,
}: Props) => {
  return (
    <div>
      <div className='flex items-center gap-2'>
        <MonthInput year={year} month={month} onChange={handleDateInputChange} />
      </div>
      <h1>Calendário de Férias e Afastamentos</h1>
    </div>
  )
}
