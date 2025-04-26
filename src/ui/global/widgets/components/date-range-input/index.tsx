import { DateRangePicker } from '@heroui/date-picker'
import { useDateRangeInput } from './use-range-date-input'

type DateRangeInputProps = {
  defeaultStartDate: Date
  defeaultEndDate: Date
  onStartDateChange: (date: Date) => void
  onEndDateChange: (date: Date) => void
}

export const DateRangeInput = ({
  defeaultStartDate,
  defeaultEndDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeInputProps) => {
  const { startDate, endDate, handleValueChange } = useDateRangeInput({
    defeaultStartDate,
    defeaultEndDate,
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
        label='Período'
      />
    </div>
  )
}
