import { Button } from '@heroui/button'
import { ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import type { RefObject } from 'react'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { useCreateWithdrawSolicitationModal } from './use-create-withdraw-solicitation-modal'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'
import { DateRangePicker } from '@heroui/date-picker'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'

type AttachmentUploadModalProps = {
  ref?: RefObject<DialogRef>
}

export const CreateWithdrawSolicitationModal = ({ ref }: AttachmentUploadModalProps) => {
  const {
    isLoading,
    handleFileChange,
    handleSubmit,
    handleJustificationTypeChange,
    handleDescriptionChange,
    handleDatesChange,
  } = useCreateWithdrawSolicitationModal()

  return (
    <Dialog ref={ref} trigger={null} size='md' title=''>
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center items-center w-full text-lg'>
            Pedir afastamento
          </ModalHeader>
          <ModalBody>
            <DateRangePicker
              label='Dias do afastamento'
              minValue={today(getLocalTimeZone())}
              onChange={handleDatesChange}
            />

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
