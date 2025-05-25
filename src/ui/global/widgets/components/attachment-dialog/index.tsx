import { Dialog } from '../dialog'
import type { DialogRef } from '../dialog/types'
import { useRef } from 'react'
import { useAttachmentDialog } from './use-attachment-dialog'
import { Image } from '@heroui/react'

type AttachmentDialogProps = {
  trigger: React.ReactNode
  attachmentKey?: string
}

export const AttachmentDialog = ({ trigger, attachmentKey }: AttachmentDialogProps) => {
  const { attachmentUrl, isLoading } = useAttachmentDialog(attachmentKey)
  const dialogRef = useRef<DialogRef>(null)
  return (
    <Dialog ref={dialogRef} title='' trigger={trigger}>
      <div className='w-full h-full'>
        {attachmentUrl ? (
          <Image
            isLoading={isLoading}
            className='w-[100%] h-96 p-2 object-fill'
            src={attachmentUrl}
            alt='Attahcment123'
          />
        ) : (
          <div className='flex items-center justify-center h-64'>
            <span className='text-gray-500'>Nenhum arquivo encontrado...</span>
          </div>
        )}
      </div>
    </Dialog>
  )
}
