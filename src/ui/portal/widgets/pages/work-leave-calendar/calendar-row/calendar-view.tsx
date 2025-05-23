import { Avatar } from '@heroui/avatar'

type Props = {
  collaborator: {
    id: string
    name: string
  }
  description: string
  startedAt: Date
  endedAt: Date
  isVacation: boolean
  monthDaysCount: number
}

export const CalendarRowView = ({
  collaborator,
  description,
  startedAt,
  endedAt,
  isVacation,
  monthDaysCount,
}: Props) => {
  return (
    <div className='grid grid-[repeat(40,1fr)]'>
      <div className='col-span-5 flex items-center justify-center gap-1'>
        <Avatar
          name={collaborator.name}
          color='primary'
          isBordered
          className='w-6 h-6 text-3xl'
        />
        <span className='text-sm font-medium'>{collaborator.name}</span>
      </div>
      {Array.from({ length: monthDaysCount }).map((_, index) => (
        <div key={collaborator.id.concat(index.toString())} className='col-span-1'>
          {index + 1}
        </div>
      ))}
    </div>
  )
}
