import type { JustificationDto } from '@/@core/portal/dtos'
import { AttachmentDialog } from '@/ui/global/widgets/components/attachment-dialog'
import { IconButton } from '@/ui/global/widgets/components/icon-button'

type Props = {
  justification: JustificationDto
}

export const JusticationViewerView = ({ justification }: Props) => {
  return (
    <div className='flex flex-col p-3 rounded-lg border border-zinc-300 bg-white shadow-sm'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-semibold text-slate-700'>
          Justificativa: {justification.justificationType.name}
        </span>

        {justification.attachment?.key && (
          <AttachmentDialog
            attachmentKey={justification.attachment.key}
            trigger={
              <IconButton
                name='eye'
                className='text-slate-600 hover:text-primary hover:bg-primary/10 transition-colors border border-zinc-300'
              />
            }
          />
        )}
      </div>

      {justification.description && (
        <p className='text-sm text-slate-600 whitespace-pre-line'>
          Observação: {justification.description}
        </p>
      )}
    </div>
  )
}
