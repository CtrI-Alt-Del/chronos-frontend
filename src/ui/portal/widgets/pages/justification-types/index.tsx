'use client'

import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { JustificationTypeDialog } from './justification-type-dialog/justification-type-dialog'
import { JustificationTypeCard } from './justification-type-card/justification-type-card'
import { useJustificationTypesPage } from './use-justification-types-page'
import type { JustificationTypeDto } from '@/@core/portal/dtos'

export const JustificationTypesPage = ({
  justificationTypes,
}: { justificationTypes: JustificationTypeDto[] }) => {
  const {
    isLoading,
    handleCreateJustificationType,
    handleUpdateJustificationType,
    handleDeleteJustificationType,
  } = useJustificationTypesPage()

  return (
    <div className='container p-4 mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <JustificationTypeDialog
          trigger={
            <Button color='primary' startContent={<Icon name='plus' />}>
              Adicionar Justificativa
            </Button>
          }
          handleCreateJustificationType={handleCreateJustificationType}
        />
      </div>

      {justificationTypes.length === 0 ? (
        <div className='py-8 text-center text-gray-500'>
          Nenhum tipo de justificativa encontrado.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {justificationTypes.map((item) => (
            <JustificationTypeCard
              key={item.id}
              justificationType={item}
              onUpdate={handleUpdateJustificationType}
              onDelete={handleDeleteJustificationType}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  )
}
