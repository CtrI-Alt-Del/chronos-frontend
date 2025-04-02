'use client'

import type { SolicitationDto } from '@/@core/solicitation/dtos'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { ChevronDown } from 'lucide-react'
import { Spinner } from '@heroui/spinner'
import { Button } from '@heroui/button'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Avatar } from '@heroui/avatar'
import { useDatetime } from '@/ui/global/hooks/use-datetime'

type SolicitationAccordionProps = {
  solicitations: SolicitationDto[] | null
  isLoading: boolean
  userRole: string
  isResolvingSolicitation: boolean
  handleDeny: (solicitationId: string) => void
  handleApprove: (solicitationId: string) => void
}
export const SolicitationAccordion = ({
  userRole,
  solicitations,
  isLoading,
  isResolvingSolicitation,
  handleDeny,
  handleApprove,
}: SolicitationAccordionProps) => {
  const { formatDate } = useDatetime()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <Spinner color='primary' />
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

  const statusMapping: Record<string, { label: string; color: string }> = {
    PENDING: { label: 'Pendente', color: 'text-yellow-500 bg-yellow-500' },
    APPROVED: { label: 'Aprovado', color: 'text-green-500 bg-green-500' },
    DENIED: { label: 'Negado', color: 'text-red-500 bg-red-500' },
  }
  return (
    <div className='w-full'>
      <Accordion className='px-4 rounded-lg border border-gray-border'>
        {solicitations.map((solicitation) => {
          const statusInfo = statusMapping[solicitation.status] || {
            label: solicitation.status,
            color: 'text-gray-500 bg-gray-500',
          }

          return (
            <AccordionItem
              key={solicitation.id}
              aria-label={`Accordion ${solicitation.id}`}
              title={
                <div className='flex flex-col gap-3 items-start w-full text-sm sm:flex-row sm:justify-between sm:items-center lg:text-base sm:gap-2'>
                  <div className='flex gap-2 items-center'>
                    <div
                      className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[1]}`}
                    />
                    <span className='text-base text-gray-500 md:text-lg'>
                      {solicitation.description}
                    </span>
                  </div>
                  <div className='flex justify-center items-center mt-2 ml-5 sm:ml-0 sm:mt-0'>
                    <span
                      className={`block sm:translate-y-3 text-base ${statusInfo.color.split(' ')[0]}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              }
              subtitle={
                <div className='flex flex-col items-start pl-6 mt-3 sm:flex-row sm:gap-6 sm:items-center sm:mt-2'>
                  <span className='text-sm text-slate-800'>
                    {formatDate(solicitation.date)}
                  </span>
                  <div className='flex gap-2 items-center mt-2 sm:mt-0'>
                    <Avatar
                      color='primary'
                      isBordered
                      className='rounded-full size-3'
                      radius='sm'
                    />
                    <span className='text-slate-800'>
                      {solicitation.senderResponsible.dto.name}
                    </span>
                  </div>
                </div>
              }
              indicator={<ChevronDown className='w-4 h-4' />}
            >
              <div className='flex flex-col gap-4 justify-between items-start sm:flex-row sm:items-center sm:gap-3'>
                <div className='text-sm sm:text-base'>{solicitation.feedbackMessage}</div>
                {userRole === 'MANAGER' && solicitation.status === 'PENDING' && (
                  <div className='flex gap-2 mt-3 w-full sm:mt-2 sm:w-auto'>
                    <AlertDialog
                      isLoading={isResolvingSolicitation}
                      trigger={
                        <Button color='success' className='w-full text-white sm:w-auto' size='sm'>
                          Aprovar
                        </Button>
                      }
                      onCancel={() => {}}
                      title='ALERTA'
                      onConfirm={() => handleApprove(solicitation.id as string)}
                    >
                      Voce tem certeza que deseja aprovar essa solicitação?
                    </AlertDialog>
                    <AlertDialog
                      isLoading={isResolvingSolicitation}
                      trigger={
                        <Button color='danger' className='w-full sm:w-auto' size='sm'>
                          Negar
                        </Button>
                      }
                      onCancel={() => {}}
                      title='ALERTA'
                      onConfirm={() => handleDeny(solicitation.id as string)}
                    >
                      Voce tem certeza que deseja negar essa solicitação?
                    </AlertDialog>
                  </div>
                )}
              </div>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
