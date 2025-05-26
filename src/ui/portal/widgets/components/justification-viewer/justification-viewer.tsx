import type { JustificationDto } from '@/@core/portal/dtos'
import { AttachmentDialog } from '@/ui/global/widgets/components/attachment-dialog'
import { IconButton } from '@/ui/global/widgets/components/icon-button'
import { cn } from '@heroui/theme'

type Props = {
  justification: JustificationDto
  isSmall?: boolean
}

export const JusticationViewerView = ({ justification, isSmall = false }: Props) => {
  return (
    <div className='flex flex-col p-3 rounded-lg border border-zinc-300 bg-white shadow-sm'>
      <div className='flex items-center justify-between'>
        <span
          className={cn('font-semibold text-slate-700', isSmall ? 'text-xs' : 'text-sm')}
        >
          Justificativa: {isSmall && <br />}
          {justification.justificationType.name}
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
        <p
          className={cn(
            'text-sm text-slate-600 whitespace-pre-line mt-1',
            isSmall ? 'text-xs' : 'text-sm',
          )}
        >
          Observação: {justification.description}
        </p>
      )}
    </div>
  )
}
