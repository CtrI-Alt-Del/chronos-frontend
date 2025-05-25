import { Button } from '@heroui/button'
import type { RefObject } from 'react'
import { useCreateExcuseAbsenceSolicitationModal } from './use-attachment-upload-modal'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'
import { Dialog } from '@/ui/global/widgets/components/dialog'

type AttachmentUploadModalProps = {
  workDayLogDate: string
  ref: RefObject<DialogRef>
}

export const CreateExcuseAbsenceSolicitationModal = ({
  workDayLogDate,
  ref,
}: AttachmentUploadModalProps) => {
  const {
    isLoading,
    handleFileChange,
    handleSubmit,
    handleJustificationTypeChange,
    handleDescriptionChange,
  } = useCreateExcuseAbsenceSolicitationModal(workDayLogDate)

  return (
    <Dialog ref={ref} title={`Pedir abono de falta para ${workDayLogDate}`}>
      {(closeDialog) => (
        <>
          <JustificationModal
            onFileInputChange={handleFileChange}
            onDescriptionChange={handleDescriptionChange}
            onJustificationTypeChange={handleJustificationTypeChange}
          />
          <div className='flex justify-center items-center gap-4 mt-4'>
            <Button color='default' variant='flat' onPress={closeDialog}>
              Cancelar
            </Button>
            <Button color='primary' isLoading={isLoading} onPress={handleSubmit}>
              Enviar
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
