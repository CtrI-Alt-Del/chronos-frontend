import type { JustificationDto } from '@/@core/portal/dtos'
import { AttachmentDialog } from '@/ui/global/widgets/components/attachment-dialog'
import { IconButton } from '@/ui/global/widgets/components/icon-button'

type Props = {
  justification: JustificationDto
}

export const JustificationView = ({ justification }: Props) => {
  return (
    <div>
      <span className='text-slate-800'>{justification.justificationType.name}</span>
      <AttachmentDialog
        attachmentKey={justification.attachment?.key}
        trigger={
          <IconButton
            name='file'
            className=' text-slate-800 bg-transparent duration-1000 hover:bg-primary hover:text-white border-zinc-400 '
          />
        }
      />
    </div>
  )
}
