'use client'

import { Tabs, Tab } from '@heroui/react'

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { DayOffScheduleDto } from '@/@core/work-schedule/dtos'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { useBreakpoint } from '@/ui/global/hooks/use-breakpoint'
import type { Tab as TabKey } from '@/ui/collaboration/stores/collaborator-store/types'
import { CollaboratorTab } from './collaborator-tab'
import { DayOffScheduleTab } from './day-off-schedule-tab'
import { useCollaboratorPage } from './use-collaborator-page'
import { TimeCardTab } from './use-time-card-tab'

type CollaboratorPageProps = {
  collaborator?: CollaboratorDto
  dayOffSchedule?: DayOffScheduleDto
}

export const CollaboratorPage = ({
  collaborator,
  dayOffSchedule,
}: CollaboratorPageProps) => {
  const { activeTab, isDayOffScheduleTabDisabled, handleTabChange } = useCollaboratorPage(
    collaborator,
    dayOffSchedule,
  )
  const { md } = useBreakpoint()

  return (
    <div className='w-full max-w-5xl mx-auto justify-between mt-3 md:-translate-x-6'>
      <Tabs
        aria-label='Opções'
        selectedKey={activeTab}
        onSelectionChange={(key) => handleTabChange(key as TabKey)}
        classNames={{
          base: 'block',
          tabList: 'w-full mx-auto relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#22d3ee]',
          tab: 'w-full px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
          panel: 'pt-3',
        }}
        color='primary'
        variant='underlined'
      >
        <Tab
          key='collaborator-tab'
          title={
            <div className='flex items-center space-x-2 text-sm'>
              {md && <Icon name='collaborator' />}
              <span>Colaborador</span>
            </div>
          }
        >
          <CollaboratorTab collaborator={collaborator} />
        </Tab>
        <Tab
          key='day-off-schedule-tab'
          isDisabled={isDayOffScheduleTabDisabled}
          title={
            <div className='flex items-center space-x-2 text-sm'>
              {md && <Icon name='day-off-schedule' />}
              <span>Escala de folgas</span>
            </div>
          }
        >
          <DayOffScheduleTab
            dayOffSchedule={dayOffSchedule}
            collaboratorId={collaborator?.id}
          />
        </Tab>
        {collaborator?.id && (
          <Tab
            key='time-card-tab'
            title={
              <div className='flex items-center space-x-2 text-sm'>
                {md && <Icon name='time-card' />}
                <span>Espelho ponto</span>
              </div>
            }
          >
            <TimeCardTab collaboratorId={collaborator.id} />
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
