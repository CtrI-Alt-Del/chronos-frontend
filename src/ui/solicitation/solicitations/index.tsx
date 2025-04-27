'use client'

import { Tab, Tabs } from '@heroui/react'

import { useSolicitationPage } from './use-solicitation-page'
import { DayOffScheduleSolicitationAccordion } from './day-off-schedule-solicitations-accordion'
import { TimePunchAdjustmentSolicitationAccordion } from './time-punch-adjustment-solicitations-accordion'
import { DayOffSolicitationAccordion } from './day-off-solicitations-accordion'

type SolcitationPageProps = {
  userRole: string
  workdayLogId: string
}
export const SolicitationsPage = ({ userRole, workdayLogId }: SolcitationPageProps) => {
  const {
    dayOffSolicitations,
    dayOffScheduleSolicitations,
    timePunchAdjustmentSolicitations,
    isLoading,
    isResolvingSolicitation,
    refetch,
    handleApproveSolicitation,
    handleDenySolicitation,
  } = useSolicitationPage()

  return (
    <div>
      <div className='px-10 py-4'>
        <Tabs
          aria-label='Opcoes'
          color='primary'
          classNames={{
            base: 'block',
            tabList: 'w-full mx-auto relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-[#22d3ee]',
            tab: 'w-full px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
            panel: 'pt-3',
          }}
          variant='underlined'
        >
          <Tab
            key='time-punch-solicitation-tab'
            title={
              <div className='flex items-center space-x-2 text-sm'>
                <span>Solicitações de Troca de Ponto</span>
              </div>
            }
          >
            <TimePunchAdjustmentSolicitationAccordion
              isResolvingSolicitation={isResolvingSolicitation}
              solicitations={timePunchAdjustmentSolicitations}
              isLoading={isLoading}
              userRole={userRole}
              handleApprove={handleApproveSolicitation}
              handleDeny={handleDenySolicitation}
            />
          </Tab>
          <Tab
            key='day-off-schedule-tab'
            title={
              <div className='flex items-center space-x-2 text-sm'>
                <span>Solicitacoes de Troca de Escala</span>
              </div>
            }
          >
            <DayOffScheduleSolicitationAccordion
              isResolvingSolicitation={isResolvingSolicitation}
              solicitations={dayOffScheduleSolicitations}
              isLoading={isLoading}
              userRole={userRole}
              handleApprove={handleApproveSolicitation}
              handleDeny={handleDenySolicitation}
            />
          </Tab>
          <Tab
            key='day-off-solicitation-tab'
            title={
              <div className='flex items-center space-x-2 text-sm'>
                <span>Solicitacoes de Folga</span>
              </div>
            }
          >
            <DayOffSolicitationAccordion
              isResolvingSolicitation={isResolvingSolicitation}
              solicitations={dayOffSolicitations}
              isLoading={isLoading}
              userRole={userRole}
              handleApprove={handleApproveSolicitation}
              handleDeny={handleDenySolicitation}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
