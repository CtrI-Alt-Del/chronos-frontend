import { Tabs, Tab } from '@heroui/react'

import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import type { DayOffScheduleDto, WeekdayScheduleDto } from '@/@core/work-schedule/dtos'
import { Icon } from '@/ui/global/widgets/components/Icon'
import { CollaboratorTab } from './collaborator-tab'
import { WeekScheduleTab } from './week-schedule-tab'
import { DayOffScheduleTab } from './day-off-schedule-tab'
import { useCollaboratorPage } from './use-collaborator-page'

type CollaboratorPageProps = {
  collaborator?: CollaboratorDto
  weekSchedule?: WeekdayScheduleDto[]
  dayOffSchedule?: DayOffScheduleDto
}

export const CollaboratorPage = ({
  collaborator,
  weekSchedule,
  dayOffSchedule,
}: CollaboratorPageProps) => {
  const { activeTab, handleTabClick } = useCollaboratorPage()

  return (
    <div className='flex w-full flex-col'>
      <Tabs
        aria-label='Options'
        selectedKey={activeTab}
        classNames={{
          tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full bg-[#22d3ee]',
          tab: 'max-w-fit px-0 h-12',
          tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
        }}
        color='primary'
        variant='underlined'
      >
        <Tab
          key='collaborator-tab'
          onClick={() => handleTabClick('collaborator-tab')}
          title={
            <div className='flex items-center space-x-2'>
              <Icon name='collaborator' />
              <span>Colaborador</span>
            </div>
          }
        >
          <CollaboratorTab collaborator={collaborator} />
        </Tab>
        <Tab
          onClick={() => handleTabClick('week-schedule-tab')}
          key='week-schedule-tab'
          title={
            <div className='flex items-center space-x-2'>
              <Icon name='collaborator' />
              <span>Escala de horário</span>
            </div>
          }
        >
          <WeekScheduleTab weekSchedule={weekSchedule} />
        </Tab>
        <Tab
          key='day-off-schedule-tab'
          onClick={() => handleTabClick('day-off-schedule-tab')}
          title={
            <div className='flex items-center space-x-2'>
              <Icon name='collaborator' />
              <span>Escala de folga</span>
            </div>
          }
        >
          <DayOffScheduleTab dayOffSchedule={dayOffSchedule} />
        </Tab>
      </Tabs>
    </div>
  )
}
