import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Input, Textarea } from '@heroui/input'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import { Select, SelectItem } from '@heroui/select'
import { useRef, useState } from 'react'
import { Dialog } from '../dialog'
import { JustificationTypeSelect } from '../justification-type-select'
import { useJustificationDialog } from './use-justification-dialog'
import { ImageInput } from '../image-input'
import type { ImageInputRef } from '../image-input/types/image-input-ref'
import { FileInput } from '../file-input'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'

type JusitificationModalProps = {
  onFileInputChange: (file: File | null) => void
  onJustificationTypeChange: (type: JustificationTypeDto) => void
  onDescriptionChange: (description: string) => void
}

export const JustificationModal = ({
  onFileInputChange,
  onJustificationTypeChange,
  onDescriptionChange,
}: JusitificationModalProps) => {
  const {
    handleJustificationTypeChange,
    fileInputRef,
    needsAttachment,
    handleFileChange,
    selectedFile,
    today,
  } = useJustificationDialog({ onJustificationTypeChange, onFileInputChange })
  const imageInputRef = useRef<ImageInputRef>(null)

  return (
    <>
      <div className='space-y-6'>
        <div className='flex  justify-center items-center flex-col space-y-9   mx-8 '>
          <JustificationTypeSelect onSelect={handleJustificationTypeChange} />
          {needsAttachment && <FileInput onChange={handleFileChange} />}

          <Textarea
            onChange={(e) => onDescriptionChange(e.target.value)}
            className='w-full  max-h-full flex flex-wrap md:flex-nowrap '
            size='lg'
            label={<span className='text-xl font-semibold'>Descricao</span>}
            minRows={5}
            placeholder='Insira a descricao'
          />
        </div>
      </div>
    </>
  )
}
