import { DatePicker, DateRangePicker } from '@heroui/date-picker'
import { useDateInput } from './use-date-input'

type DateInputProps = {
  defualtDate: Date
  onChange: (date: Date) => void
}

export const DateInput = ({ defualtDate, onChange }: DateInputProps) => {
  const { date, handleValueChange } = useDateInput(defualtDate, onChange)

  return (
    <div className='flex items-center gap-1'>
      <DatePicker
        className='max-w-xs'
        defaultValue={date}
        onChange={handleValueChange}
        label='Data'
      />
    </div>
  )
}
