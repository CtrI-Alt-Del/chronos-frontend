import { Tabs } from '@/ui/global/widgets/components/tabs'
import { PaidOvertimeSolicitationsAccordion } from './paid-overtime-solicitations-accordion'
import { ExcusedAbsenceSolicitationsAccordion } from './excused-absence-solicitations-accordion'
import { DayOffSolicitationsAccordion } from './day-off-solicitations-accordion'

type Props = {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const SolicitationsPageView = ({ activeTab, onTabChange }: Props) => {
  return (
    <div>
      <div className='px-10 py-4'>
        <Tabs.Container
          selectedKey={activeTab}
          onSelectionChange={(key) => onTabChange(String(key))}
        >
          <Tabs.Item
            key='excused-absence'
            title={<Tabs.Title>Abono de falta</Tabs.Title>}
          >
            <ExcusedAbsenceSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item key='day-off' title={<Tabs.Title>Folga</Tabs.Title>}>
            <DayOffSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item
            key='paid-overtime'
            title={<Tabs.Title>Hora extra remunerada</Tabs.Title>}
          >
            <PaidOvertimeSolicitationsAccordion />
          </Tabs.Item>
        </Tabs.Container>
      </div>
    </div>
  )
}
