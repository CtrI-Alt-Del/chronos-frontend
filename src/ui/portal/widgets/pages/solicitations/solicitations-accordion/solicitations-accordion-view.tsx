import type { ReactNode } from 'react'
import type { SolicitationDto } from '@/@core/portal/dtos'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Textarea } from '@heroui/input'
import { Avatar } from '@heroui/avatar'

import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Justification } from './justification'
import { SolicitationTitle } from './solicitation-title'
import { SolicitationActions } from '../solicitation-actions'
import { Spinner } from '@/ui/global/widgets/components/spinner'
import Link from 'next/link'
import { ROUTES } from '@/constants'

type Props<Solicitation> = {
  solicitations: Solicitation[]
  isViewerManager: boolean
  isLoading: boolean
  children: (solicitation: Solicitation) => ReactNode
  onSolicitationApprove: (solicitationId: string, feedbackMessage?: string) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
}

export const SolicitationsAccordionView = <Solicitation extends SolicitationDto>({
  children,
  isViewerManager,
  solicitations,
  isLoading,
  onSolicitationApprove,
  onSolicitationDeny,
}: Props<Solicitation>) => {
  const { formatDate } = useDatetime()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spinner />
      </div>
    )
  }

  if (!solicitations || solicitations.length === 0) {
    return (
      <div className='flex items-center justify-center h-64'>
        <span className='text-gray-500'>Nenhuma solicitação encontrada</span>
      </div>
    )
  }

  return (
    <Accordion className='border border-gray-border rounded-lg px-4'>
      {solicitations.map((solicitation) => (
        <AccordionItem
          key={solicitation.id}
          aria-label={`Accordion ${solicitation.id}`}
          indicator={<Icon name='arrow-down' className='w-4 h-4' />}
          title={
            <SolicitationTitle
              solicitationType={solicitation.type}
              solicitationStatus={solicitation.status}
            />
          }
          subtitle={
            <div className='flex flex-col md:flex-row items-center gap-6 mt-2 pl-6'>
              {solicitation.date && (
                <span className='text-slate-800 text-sm'>
                  {formatDate(solicitation.date)}
                </span>
              )}
              <Link
                href={ROUTES.collaboration.collaborator(
                  solicitation.senderResponsible.id,
                )}
                className='flex items-center gap-2'
              >
                <Avatar
                  color='primary'
                  isBordered
                  className='size-3 rounded-full'
                  radius='sm'
                />
                <span className='text-slate-800'>
                  {solicitation.senderResponsible?.entity?.name} |{' '}
                  {solicitation.senderResponsible?.entity?.email}
                </span>
              </Link>
            </div>
          }
        >
          <div className='pl-5 pb-3'>
            {solicitation.justification && (
              <Justification justification={solicitation.justification} />
            )}
            <div>
              {solicitation.description && (
                <Textarea
                  label='Observação'
                  defaultValue={solicitation.description}
                  isReadOnly
                />
              )}
              {solicitation.feedbackMessage && (
                <div>
                  <Textarea
                    label='Mensagem de feedback'
                    defaultValue={solicitation.feedbackMessage}
                    isReadOnly
                  />
                  <div className='flex items-center gap-2 text-sm text-slate-700 mt-3'>
                    Gerente responsável:
                    <Avatar
                      color='primary'
                      isBordered
                      className='size-3 rounded-full'
                      radius='sm'
                    />
                    <span>
                      {solicitation.replierResponsible?.entity?.name} |{' '}
                      {solicitation.replierResponsible?.entity?.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {children(solicitation)}
            {isViewerManager && (
              <div className='mt-6'>
                <SolicitationActions
                  isLoading={isLoading}
                  onApprove={(feedbackMessage) =>
                    onSolicitationApprove(String(solicitation.id), feedbackMessage)
                  }
                  onDeny={(feedbackMessage) =>
                    onSolicitationDeny(String(solicitation.id), feedbackMessage)
                  }
                />
              </div>
            )}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
