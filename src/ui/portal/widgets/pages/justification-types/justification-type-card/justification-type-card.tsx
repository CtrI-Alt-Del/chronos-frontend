'use client'

import { Button } from '@heroui/button'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { JustificationTypeDialog } from '../justification-type-dialog/justification-type-dialog'
import type { JustificationTypeDto } from '@/@core/portal/dtos'

type JustificationTypeCardProps = {
  justificationType: JustificationTypeDto
  onUpdate: (id: string, data: JustificationTypeDto) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

export const JustificationTypeCard = ({
  justificationType,
  onUpdate,
  onDelete,
  isLoading,
}: JustificationTypeCardProps) => {
  const { id, name, shouldHaveAttachment } = justificationType

  return (
    <div className='flex overflow-hidden flex-col bg-white rounded-lg border border-gray-200'>
      <div className='flex-grow p-4'>
        <h3 className='mb-2 text-lg font-medium text-gray-900'>{name}</h3>
        <div className='flex items-center text-sm'>
          {shouldHaveAttachment ? (
            <div className='flex items-center gap-2 px-2.5 py-0.5 bg-blue-50 rounded-md'>
              <span className='w-2 h-2 bg-blue-500 rounded-full' />
              <span className='text-blue-700'>Anexo obrigatório</span>
            </div>
          ) : (
            <div className='flex items-center gap-2 px-2.5 py-0.5 bg-gray-50 rounded-md'>
              <span className='w-2 h-2 bg-gray-300 rounded-full' />
              <span className='text-gray-600'>Anexo opcional</span>
            </div>
          )}
        </div>
      </div>

      <div className='flex gap-2 justify-end p-3 bg-gray-50 border-t border-gray-200'>
        <JustificationTypeDialog
          justificationType={justificationType}
          trigger={
            <Button
              variant='flat'
              size='sm'
              className='flex gap-1 items-center text-blue-600 bg-blue-50 hover:bg-blue-100'
              aria-label='Editar'
            >
              <Icon name='edit' className='w-4 h-4' />
              <span>Editar</span>
            </Button>
          }
          handleCreateJustificationType={(data) => onUpdate(id || '', data)}
        />
        <AlertDialog
          trigger={
            <Button
              variant='flat'
              size='sm'
              className='flex gap-1 items-center text-red-600 bg-red-50 hover:bg-red-100'
              aria-label='Excluir'
            >
              <Icon name='trash' className='w-4 h-4' />
              <span>Excluir</span>
            </Button>
          }
          title='Excluir Justificativa'
          onConfirm={() => onDelete(id || '')}
          isLoading={isLoading}
        >
          <p>
            Tem certeza que deseja excluir a justificativa <strong>{name}</strong>?
          </p>
        </AlertDialog>
      </div>
    </div>
  )
}
