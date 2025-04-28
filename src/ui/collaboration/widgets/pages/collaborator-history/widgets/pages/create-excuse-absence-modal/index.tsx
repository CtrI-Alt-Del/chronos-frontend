import { Button } from '@heroui/button'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import { useRef, useState } from 'react'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { FileInput } from '@/ui/global/widgets/components/file-input'
import { useAttachmentUploadModal } from './use-attachment-upload-modal'

type AttachmentUploadModalProps = {
  workdayLogId: string
}

export const AttachmentUploadModal = ({ workdayLogId }: AttachmentUploadModalProps) => {
  const { 
    handleFileChange, 
    handleSubmit, 
    isLoading, 
    selectedFile 
  } = useAttachmentUploadModal(workdayLogId)
  
  return (
    <Dialog
      trigger={
        <Button 
          size="sm" 
          color='secondary' 
          className="text-sm text-white font-medium whitespace-nowrap p-1 rounded-md min-w-[120px]"
        >
          Enviar Atestado
        </Button>
      }
      size='md'
      title='Upload de Atestado'
    >
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center items-center w-full text-xl'>
            Enviar Atestado
          </ModalHeader>
          <ModalBody>
            <div className="py-4 space-y-6">
              <FileInput 
                onChange={handleFileChange} 
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="default" 
              variant="flat" 
              onPress={onClose}
            >
              Cancelar
            </Button>
            <Button 
              color="primary" 
              isLoading={isLoading}
              isDisabled={!selectedFile}
              onPress={() => {
                handleSubmit()
                  .then(() => onClose())
                  .catch(() => {})
              }}
            >
              Enviar
            </Button>
          </ModalFooter>
        </>
      )}
    </Dialog>
  )
} 