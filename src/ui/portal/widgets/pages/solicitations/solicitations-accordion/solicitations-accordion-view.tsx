import type { ReactNode } from 'react'
import type { SolicitationDto } from '@/@core/portal/dtos'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Textarea } from '@heroui/input'
import { Avatar } from '@heroui/avatar'
import { Skeleton } from '@heroui/skeleton'
import { Pagination } from '@heroui/pagination'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Justification } from './justification'
import { SolicitationTitle } from './solicitation-title'
import { SolicitationActions } from '../solicitation-actions'
import Link from 'next/link'
import { ROUTES } from '@/constants'

type Props<Solicitation> = {
  solicitations: Solicitation[]
  isViewerManager: boolean
  isLoading: boolean
  currentPage: number
  totalPages: number
  children: (solicitation: Solicitation) => ReactNode
  onSolicitationApprove: (
    solicitationId: string,
    feedbackMessage?: string,
    collaboratorId?: string,
  ) => void
  onSolicitationDeny: (solicitationId: string, feedbackMessage?: string) => void
  handlePageChange: (page: number) => void
}

export const SolicitationsAccordionView = <Solicitation extends SolicitationDto>({
  children,
  isViewerManager,
  solicitations,
  isLoading,
  currentPage,
  totalPages,
  onSolicitationApprove,
  onSolicitationDeny,
  handlePageChange,
}: Props<Solicitation>) => {
  const { formatDate } = useDatetime()
  console.log("currentPage", currentPage)
  console.log("totalPages", totalPages)

  if (isLoading) {
    return (
      <div className='px-4 rounded-lg border border-gray-border'>
        {[...Array(5)].map((_, index) => (
          <div
            key={String(index)}
            className='py-4 border-b border-gray-border last:border-b-0'
          >
            <div className='pl-6 mt-4 space-y-2'>
              <div className='flex gap-2 items-center'>
                <Skeleton className='w-4 h-4 rounded-full' />
                <Skeleton className='w-48 h-4 rounded' />
                <Skeleton className='mr-10 ml-auto w-32 h-6 rounded-full' />
              </div>
            </div>

            <div className='pl-5 mt-4 space-y-4'>
              {isViewerManager && (
                <div className='flex gap-4 ml-7'>
                  <Skeleton className='w-32 h-5 rounded' />
                  <Skeleton className='w-96 h-5 rounded' />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!solicitations || solicitations.length === 0) {
    return (
      <div className='flex justify-center items-center h-64'>
        <span className='text-gray-500'>Nenhuma solicitação encontrada</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Accordion className='px-4 rounded-lg border border-gray-border'>
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
              <div className='flex flex-col gap-6 items-center pl-6 mt-2 md:flex-row'>
                {solicitation.date && (
                  <span className='text-sm text-slate-800'>
                    {formatDate(solicitation.date)}
                  </span>
                )}
                <Link
                  href={ROUTES.collaboration.collaborator(
                    solicitation.senderResponsible.id,
                  )}
                  className='flex gap-2 items-center'
                >
                  <Avatar
                    color='primary'
                    isBordered
                    className='rounded-full size-3'
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
            <div className='pb-3 pl-5'>
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
                    <div className='flex gap-2 items-center mt-3 text-sm text-slate-700'>
                      Gerente responsável:
                      <Avatar
                        color='primary'
                        isBordered
                        className='rounded-full size-3'
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
            {children(solicitation)}
            {isViewerManager && (
              <div className='mt-6'>
                <SolicitationActions
                  isLoading={isLoading}
                  onApprove={(feedbackMessage) =>
                    onSolicitationApprove(
                      String(solicitation.id),
                      feedbackMessage,
                      String(solicitation.senderResponsible.id),
                    )
                  }
                  onDeny={(feedbackMessage) =>
                    onSolicitationDeny(String(solicitation.id), feedbackMessage)
                  }
                />
              </div>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            showControls={true}
            total={totalPages}
            initialPage={currentPage}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
