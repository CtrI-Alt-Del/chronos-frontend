'use client'

import type { SolicitationDto } from '@/@core/solicitation/dtos'
import { TimePunchLogAdjustmentSolicitationDto } from '@/@core/solicitation/dtos/time-punch-log-adjustment-solicitation-dto'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'
import { ChevronDown } from 'lucide-react'

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

          const title = (
            <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
              <div className='flex items-center gap-2'>
                <div
                  className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[1]}`}
                />
                <span className='text-gray-500 text-sm md:text-lg'>
                  {solicitation.description}
                </span>
              </div>
              <div className='flex items-center justify-center'>
                <span
                  className={`block translate-y-3 text-base   ${statusInfo.color.split(' ')[0]}`}
                >
                  {statusInfo.label}
                </span>
              </div>
            </div>
          )

          const subtitle = (
            <div className='flex flex-col md:flex-row items-center gap-6 mt-2 pl-6'>
              <span className='text-slate-800 text-sm'>
                {formatDate(solicitation.date)}
              </span>
              <div className='flex items-center gap-2 '>
                <Avatar
                  color='primary'
                  isBordered
                  className='size-3 rounded-full'
                  radius='sm'
                />
                <span className='text-slate-800'>
                  {solicitation.senderResponsible?.dto.name}
                </span>
              </div>
            </div>
          )

          if (solicitation.type === 'TIME_PUNCH') {
            const timePunchSolicitation =
              solicitation as TimePunchLogAdjustmentSolicitationDto

            return (
              <AccordionItem
                key={solicitation.id}
                aria-label={`Accordion ${solicitation.id}`}
                title={
                  <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
                    <div className='flex items-center gap-2'>
                      <div
                        className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[1]}`}
                      />
                      <span className='text-gray-500 text-sm md:text-lg'>
                        Pedido pra alteração de ponto do dia{' '}
                        {formatDate(timePunchSolicitation.workdayLogDate)}
                      </span>
                    </div>
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
                  <div className='flex flex-col md:flex-row items-center gap-6 mt-2 pl-6'>
                    <span className='text-slate-800 text-sm'>
                      {formatDate(solicitation.date)}
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
                    </div>
                    <span>
                      {(() => {
                        switch (timePunchSolicitation.reason) {
                          case 'SICK':
                            return 'Estava doente'
                          case 'FORGOTTEN':
                            return 'Esqueci de bater o ponto'
                          case 'UNWANTED':
                            return 'Bati sem querer'
                          case 'OTHER':
                            return 'Outro'
                          default:
                            return timePunchSolicitation.reason
                        }
                      })()}
                    </span>
                    <span>
                      {(() => {
                        switch (timePunchSolicitation.period) {
                          case 'FIRST_CLOCK_IN':
                            return 'Primeira Entrada'
                          case 'FIRST_CLOCK_OUT':
                            return 'Primeira Saída'
                          case 'SECOND_CLOCK_IN':
                            return 'Segunda Entrada'
                          case 'SECOND_CLOCK_OUT':
                            return 'Segunda Saída'
                          default:
                            return timePunchSolicitation.period
                        }
                      })()}
                  </div>
                </div>
              }
                indicator={<Icon name='arrow-down' className='w-4 h-4' />}
              >
                <div className='flex justify-between items-center flex-col md:flex-row'>
                  <div>{timePunchSolicitation.description}</div>
                  {userRole === 'MANAGER' && solicitation.status === 'PENDING' && (
                    <div className='flex flex-col md:flex-row gap-2 mt-2 w-full md:w-fit'>
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
                        Você tem certeza que deseja aprovar essa solicitação?
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
                        Você tem certeza que deseja negar essa solicitação?
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </AccordionItem>
            )
          }

          return (
            <AccordionItem
              key={solicitation.id}
              aria-label={`Accordion ${solicitation.id}`}
              title={title}
              subtitle={subtitle}
              indicator={<ChevronDown className='w-4 h-4' />}
            >
              <div className='flex justify-between  flex-col md:flex-row items-center'>
                {solicitation.feedbackMessage}
                {userRole === 'MANAGER' && solicitation.status === 'PENDING' && (
                  <div className='flex flex-col md:flex-row gap-2 mt-2  w-full md:w-fit'>
                    <AlertDialog
                      isLoading={isResolvingSolicitation}
                      trigger={
                        <Button color='primary' className='text-white' size='sm'>
                          Aprovar
                        </Button>
                      }
                      onCancel={() => { }}
                      title='ALERTA'
                      onConfirm={() => handleApprove(solicitation.id as string)}
                    >
                      Você tem certeza que deseja aprovar essa solicitação?
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
                      Você tem certeza que deseja negar essa solicitação?
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

