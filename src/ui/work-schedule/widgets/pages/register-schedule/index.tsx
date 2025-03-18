import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import Link from 'next/link'

import { CreateWorkSchedule } from './create-work-schedule'

export const RegisterSchedulePage = () => {
  return (
    <div>
      <div className='text-3xl font-extrabold text-black px-10 pb-6'>
        <h1 className=''>Registro de Escala</h1>
      </div>

      <div className='flex w-full pl-10 pr-20 py-2'>
        <Input
          label={<span className='text-blue-500 font-bold text-lg'>Nome da Escala</span>}
          placeholder='Buscar escala...'
          variant='flat'
          labelPlacement='outside'
        />
      </div>

      <div className='flex flex-col pl-10 pr-20 py-4'>
        <CreateWorkSchedule />
      </div>

      <div className='flex mr-12 pr-20 justify-end'>
        <Button as={Link} href='' color='primary' className='px-6 py-5 text-lg'>
          Confirmar
        </Button>
      </div>
    </div>
  )
}
