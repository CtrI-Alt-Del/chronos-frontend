import type { RefObject } from 'react'
import { Button } from '@heroui/button'
import { DateRangePicker } from '@heroui/date-picker'
import { getLocalTimeZone, today } from '@internationalized/date'

import { Dialog } from '@/ui/global/widgets/components/dialog'
import { useCreateWithdrawSolicitationModal } from './use-create-withdraw-solicitation-modal'
import { JustificationModal } from '@/ui/global/widgets/components/justification-modal'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'

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
    <Dialog ref={ref} title='Pedir afastamento'>
      {(onClose) => (
        <>
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
          <div className='flex justify-center gap-2 mt-3'>
            <Button color='default' variant='flat' onPress={onClose}>
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
