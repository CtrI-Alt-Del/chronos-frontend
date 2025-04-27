import type { PropsWithChildren } from 'react'
import { AccordionItem } from '@heroui/accordion'

import type { SolicitationDto } from '@/@core/solicitation/dtos'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { StyledSolicitationStatusBadge } from './solicitations-status-badge'
import { Avatar } from '@heroui/avatar'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { JustificationView } from './justification/justification-view'

type Props = {
  solicitation: SolicitationDto
  isViewerManager: boolean
}

export const SolicitationsAccordionItemView = ({
  children,
  solicitation,
  isViewerManager,
}: PropsWithChildren<Props>) => {
  const { formatDate } = useDatetime()

  return (
    <AccordionItem
      key={solicitation.id}
      hideIndicator={isViewerManager}
      aria-label={`Accordion ${solicitation.id}`}
      indicator={<Icon name='arrow-down' className='w-4 h-4' />}
      title={<StyledSolicitationStatusBadge status={solicitation.status} />}
      subtitle={
        <div className='flex flex-col md:flex-row items-center gap-6 mt-2 pl-6'>
          <span className='text-slate-800 text-sm'>
            {formatDate(solicitation.date as Date)}
          </span>
          <div className='flex items-center gap-2'>
            <Avatar
              color='primary'
              isBordered
              className='size-3 rounded-full'
              radius='sm'
            />
            <span className='text-slate-800'>
              {solicitation.senderResponsible?.dto.name}
            </span>
            {solicitation.justification && (
              <JustificationView justification={solicitation.justification} />
            )}
          </div>
        </div>
      }
    >
      {children}
    </AccordionItem>
  )
}
