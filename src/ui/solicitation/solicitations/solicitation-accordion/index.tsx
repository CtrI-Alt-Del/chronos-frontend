'use client'

import type { SolicitationDto } from '@/@core/solicitation/dtos'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { ChevronDown } from 'lucide-react'
import { Spinner } from '@heroui/spinner'
import { Button } from '@heroui/button'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'

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
  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <Spinner color='primary' />
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

  const statusMapping: Record<string, { label: string; color: string }> = {
    PENDING: { label: 'Pendente', color: 'text-yellow-500 bg-yellow-500' },
    APPROVED: { label: 'Aprovado', color: 'text-green-500 bg-green-500' },
    DENIED: { label: 'Negado', color: 'text-red-500 bg-red-500' },
  }
  return (
    <div>
      <Accordion className='border border-gray-border rounded-lg px-4'>
        {solicitations.map((solicitation) => {
          const statusInfo = statusMapping[solicitation.status] || {
            label: solicitation.status,
            color: 'text-gray-500 bg-gray-500',
          }

          return (
            <AccordionItem
              key={solicitation.id}
              aria-label={`Accordion ${solicitation.id}`}
              startContent={
                <div
                  className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[1]}`}
                />
              }
              title={
                <div className='flex items-center justify-between w-full'>
                  <span className='text-gray-500 text-sm'>
                    {solicitation.description}
                  </span>
                  <div className='flex items-center justify-center'>
                    <span
                      className={`block translate-y-3 text-base ${statusInfo.color.split(' ')[0]}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              }
              subtitle={
                <div>
                  <span className='text-black text-lg'>
                    {new Date(solicitation.date).toLocaleDateString()}
                  </span>
                  <span className='text-black pl-8'>
                    {solicitation.senderResponsible.dto.name}
                  </span>
                </div>
              }
              indicator={<ChevronDown className='w-4 h-4' />}
            >
              <div className='flex justify-between items-center'>
                {solicitation.feedbackMessage}
                {userRole === 'MANAGER' && solicitation.status === 'PENDING' && (
                  <div className='flex gap-2 mt-2'>
                    <AlertDialog
                      isLoading={isResolvingSolicitation}
                      trigger={
                        <Button color='success' className='text-white' size='sm'>
                          Aprovar
                        </Button>
                      }
                      onCancel={() => { }}
                      title='ALERTA'
                      onConfirm={() => handleApprove(solicitation.id as string)}
                    >
                      Voce tem certeza que deseja aprovar essa solicitação?
                    </AlertDialog>
                    <AlertDialog
                      isLoading={isResolvingSolicitation}
                      trigger={
                        <Button color='danger' size='sm'>
                          Negar
                        </Button>
                      }
                      onCancel={() => { }}
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
