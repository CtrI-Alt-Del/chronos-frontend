'use client'

import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { useDayOffSolicitationDialog } from './use-day-off-solicitation-dialog'

export const DayOffSolicitationDialog = () => {
  const {
    errors,
    isSubmitting,
    register,
    handleSubmit,
    handleJustificationTypeChange,
    handleAttachmentChange,
    handleDescriptionChange,
  } = useDayOffSolicitationDialog()
  return (
    <Dialog
      title='Solicitacao de Ferias'
      trigger={
        <div className='flex gap-4 w-full cursor-pointer items-center p-4 bg-white rounded-lg border border-[#D5E7FF] hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all duration-300'>
          <div className='p-3 rounded-lg bg-[#2D2B4F]'>
            <Icon name='clock' className='w-6 h-6 text-[#9900FF]' />
          </div>
          <div>
            <h3 className='font-medium'>Solicitar Folga</h3>
            <p className='text-sm text-gray-500'>Seu dia de descanso</p>
          </div>
        </div>
      }
    >
      {(onCancel) => (
        <div className='space-y-6 flex items-center justify-center flex-col'>
          <Input
            type='date'
            label='Data'
            className='max-w-80'
            {...register('dayOff')}
            isInvalid={Boolean(errors.dayOff)}
            errorMessage={errors.dayOff?.message}
          />
          <JustificationModal
            onDescriptionChange={handleDescriptionChange}
            onJustificationTypeChange={handleJustificationTypeChange}
            onFileInputChange={handleAttachmentChange}
          />
          {errors.justificationType && (
            <span className='text-red-500 text-sm'>
              {errors.justificationType.message === 'Required'
                ? 'Tipo de Justificativa e obrigatorio!'
                : errors.justificationType.message}
            </span>
          )}
          {errors.description && (
            <span className='text-red-500 text-sm'>
              {errors.description.message === 'Required'
                ? 'Descricao e obrigatorio!'
                : errors.description.message}
            </span>
          )}
          {errors.file && (
            <span className='text-red-500 text-sm'>
              {errors.file.message === 'Required'
                ? 'Anexo e obrigatorio!'
                : errors.file.message}
            </span>
          )}

          <div className='flex justify-center items-center gap-4 mt-4'>
            <Button
              className='w-40'
              color='danger'
              onPress={() => onCancel()}
              isDisabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              className='w-40'
              color='primary'
              onPress={() => {
                handleSubmit()
              }}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Enviar
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
