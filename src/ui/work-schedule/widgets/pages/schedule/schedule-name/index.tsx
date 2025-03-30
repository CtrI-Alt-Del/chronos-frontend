'use client'

import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { useScheduleName } from './use-schedule-name'

type ScheduleNameProps = {
  defaultValue?: string
}

export const ScheduleName = ({ defaultValue }: ScheduleNameProps) => {
  const { name, handleInputChange } = useScheduleName(defaultValue)

  return (
    <div className='flex items-center gap-2 max-w-lg'>
      <Input value={name} placeholder='Escala 5x2' onChange={handleInputChange} />
      <Button color='primary'>Salvar</Button>
    </div>
  )
}
