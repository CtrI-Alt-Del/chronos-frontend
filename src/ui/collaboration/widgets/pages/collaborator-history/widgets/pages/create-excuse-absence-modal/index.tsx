import { Button } from '@heroui/button'
import { ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import type { RefObject } from 'react'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { useCreateExcuseAbsenceSolicitationModal } from './use-attachment-upload-modal'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

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
    <Dialog ref={ref} trigger={null} size='md' title=''>
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center items-center w-full text-lg'>
            Pedir abono de falta para {workDayLogDate}
          </ModalHeader>
          <ModalBody>
            <JustificationModal
              onFileInputChange={handleFileChange}
              onDescriptionChange={handleDescriptionChange}
              onJustificationTypeChange={handleJustificationTypeChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='default' variant='flat' onPress={onClose}>
              Cancelar
            </Button>
            <Button color='primary' isLoading={isLoading} onPress={handleSubmit}>
              Enviar
            </Button>
          </ModalFooter>
        </>
      )}
    </Dialog>
  )
}
