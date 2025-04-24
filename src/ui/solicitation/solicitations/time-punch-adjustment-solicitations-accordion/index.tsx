'use client'

import type {
  DayOffScheduleAdjustmentSolicitationDto,
  SolicitationDto,
  TimePunchLogAdjustmentSolicitationDto,
} from '@/@core/solicitation/dtos'
import { useDatetime } from '@/ui/global/hooks/use-datetime'
import { AlertDialog } from '@/ui/global/widgets/components/alert-dialog'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'
import { ChevronDown } from 'lucide-react'

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
    PENDING: { label: 'Pendente', color: 'bg-yellow-500 text-yellow-500' },
    APPROVED: { label: 'Aprovado', color: 'bg-green-500 text-green-500' },
    DENIED: { label: 'Negado', color: 'bg-red-500 text-red-500' },
  }

  const renderManagerActions = (solicitation: SolicitationDto) => (
    <div className='flex flex-col md:flex-row gap-2 mt-2 w-full md:w-fit'>
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
    <Accordion className='border border-gray-border rounded-lg px-4'>
      {solicitations.map((solicitation) => {
        const statusInfo = statusMapping[solicitation.status] || {
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
            hideIndicator={userRole === "EMPLOYEE"}
            aria-label={`Accordion ${solicitation.id}`}
            indicator={<Icon name='arrow-down' className='w-4 h-4' />}
            title={
              <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
                <div className='flex items-center gap-2'>
                  <div
                    className={`w-3 h-3 rounded-full ${statusInfo.color.split(' ')[0]}`}
                  />
                  <span className='text-gray-500 text-sm md:text-lg'>
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
                </div>
                <span>{reasonText}</span>
                <span>{periodText}</span>
              </div>
            }
          >
            <div className='flex justify-between items-center flex-col md:flex-row'>
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
