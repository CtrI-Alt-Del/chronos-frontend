'use client'

import type {
  DayOffScheduleAdjustmentSolicitationDto,
  SolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '@/@core/portal/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'

const STATUSES: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pendente', color: 'bg-yellow-500 text-yellow-500' },
  APPROVED: { label: 'Aprovado', color: 'bg-green-500 text-green-500' },
  DENIED: { label: 'Negado', color: 'bg-red-500 text-red-500' },
}

type SolicitationAccordionProps = {
  solicitations: TimePunchLogAdjustmentSolicitationDto[] | null
  isLoading: boolean
  userRole: string
  isResolvingSolicitation: boolean
  handleDeny: (solicitation: SolicitationDto) => void
  handleApprove: (solicitation: SolicitationDto) => void
}

export const TimePunchAdjustmentSolicitationAccordion = ({
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

  const renderManagerActions = (solicitation: SolicitationDto) => (
    <div className='flex flex-col gap-2 mt-2 w-full md:flex-row md:w-fit'>
      <AlertDialog
        isLoading={isResolvingSolicitation}
        trigger={
          <Button color='success' className='text-white' size='sm'>
            Aprovar
          </Button>
        }
        onCancel={() => {}}
        title='ALERTA'
        onConfirm={() => handleApprove(solicitation)}
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
        onCancel={() => {}}
        title='ALERTA'
        onConfirm={() => handleDeny(solicitation)}
      >
        Você tem certeza que deseja negar essa solicitação?
      </AlertDialog>
    </div>
  )

  return (
    <Accordion className='px-4 rounded-lg border border-gray-border'>
      {solicitations.map((solicitation) => {
        const statusInfo = STATUSES[solicitation.status] ?? {
          label: solicitation.status,
          color: 'bg-gray-500 text-gray-500',
        }
        const timePunch = solicitation as TimePunchLogAdjustmentSolicitationDto

        const reasonText =
          {
            SICK: 'Estava doente',
            FORGOTTEN: 'Esqueci de bater o ponto',
            UNWANTED: 'Bati sem querer',
            OTHER: 'Outro',
          }[timePunch.reason] || timePunch.reason

        const periodText =
          {
            FIRST_CLOCK_IN: 'Primeira Entrada',
            FIRST_CLOCK_OUT: 'Primeira Saída',
            SECOND_CLOCK_IN: 'Segunda Entrada',
            SECOND_CLOCK_OUT: 'Segunda Saída',
          }[timePunch.period] || timePunch.period

        return (
          <AccordionItem
            key={solicitation.id}
            hideIndicator={userRole === 'EMPLOYEE'}
            aria-label={`Accordion ${solicitation.id}`}
            indicator={<Icon name='arrow-down' className='w-4 h-4' />}
            title={
              <div className='flex flex-col justify-between items-center w-full text-sm md:flex-row lg:text-base'>
                <div className='flex gap-2 items-center'>
                  <div
                    className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[0]}`}
                  />
                  <span className='text-sm text-gray-500 md:text-lg'>
                    Pedido pra alteração de ponto do dia{' '}
                    {formatDate(timePunch.workdayLogDate)}
                  </span>
                </div>
                <span
                  className={`block translate-y-3 text-base ${statusInfo.color.split(' ')[1]}`}
                >
                  {statusInfo.label}
                </span>
              </div>
            }
            subtitle={
              <div className='flex flex-col gap-6 items-center pl-6 mt-2 md:flex-row'>
                <span className='text-sm text-slate-800'>
                  {formatDate(solicitation.date as Date)}
                </span>
                <div className='flex gap-2 items-center'>
                  <Avatar
                    color='primary'
                    isBordered
                    className='rounded-full size-3'
                    radius='sm'
                  />
                  <span className='text-slate-800'>
                    {solicitation.senderResponsible?.entity?.name}
                  </span>
                </div>
                <span>{reasonText}</span>
                <span>{periodText}</span>
              </div>
            }
          >
            <div className='flex flex-col justify-between items-center md:flex-row'>
              <div>{timePunch.description}</div>
              {userRole === 'MANAGER' &&
                solicitation.status === 'PENDING' &&
                renderManagerActions(solicitation)}
            </div>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
