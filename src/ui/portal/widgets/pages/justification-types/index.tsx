'use client'

import { Button } from '@heroui/button'

import { Icon } from '@/ui/global/widgets/components/Icon'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { JustificationTypeDialog } from './justification-type-dialog/justification-type-dialog'
import { JustificationTypeCard } from './justification-type-card/justification-type-card'
import { useJustificationTypesPage } from './use-justification-types-page'
import { Spinner } from '@/ui/global/widgets/components/spinner'

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
          onCreateJustificationType={handleCreateJustificationType}
        />
      </div>

      {isLoading ? (
        <div className='grid place-content-center w-full h-full'>
          <Spinner />
        </div>
      ) : (
        <>
          {justificationTypes.length === 0 ? (
            <div className='py-8 text-center text-gray-500'>
              Nenhum tipo de justificativa encontrado.
            </div>
          ) : (
            <div className='grid gap-6 grid-cols-4'>
              {justificationTypes.map((item) => (
                <JustificationTypeCard
                  key={item.id}
                  isLoading={isLoading}
                  justificationType={item}
                  onUpdate={handleUpdateJustificationType}
                  onDelete={handleDeleteJustificationType}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
