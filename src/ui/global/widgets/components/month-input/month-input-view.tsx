import { Input } from '@heroui/react'

type Props = {
  year: number
  month: number
  onChange: (month: number, year: number) => void
}

export const MonthInputView = ({ year, month, onChange }: Props) => {
  return (
    <Input
      type='month'
      label='Mês'
      placeholder=''
      defaultValue={`${year}-${String(month).padStart(2, '0')}`}
      onChange={(event) => {
        const [year, month] = event.target.value.split('-').map(Number)
        onChange(month, year)
      }}
      className='w-max'
    />
  )
}
