import { DateRangePicker } from '@heroui/date-picker'
import { useDateRangeInput } from './use-range-date-input'

type DateRangeInputProps = {
  defualtStartDate: Date
  defualtEndDate: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

export const DateRangeInput = ({
  defualtStartDate,
  defualtEndDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeInputProps) => {
  const { startDate, endDate, handleValueChange } = useDateRangeInput({
    defualtStartDate,
    defualtEndDate,
    onStartDateChange,
    onEndDateChange,
  })

  return (
    <div className='flex items-center gap-1'>
      <DateRangePicker
        className='max-w-xs'
        defaultValue={{
          start: startDate,
          end: endDate,
        }}
        onChange={handleValueChange}
        label='Stay duration'
      />
    </div>
  )
}
