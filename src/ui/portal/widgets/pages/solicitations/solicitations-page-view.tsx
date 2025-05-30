import { Tabs } from '@/ui/global/widgets/components/tabs'
import { ExcusedAbsenceSolicitationsAccordion } from './excused-absence-solicitations-accordion'
import { DayOffSolicitationsAccordion } from './day-off-solicitations-accordion'
import { DayOffScheduleAdjustmentSolicitationsAccordion } from './day-off-schedule-solicitations-accordion'
import { WithdrawSolicitationsAccordion } from './withdraw-solicitation-accordin'
import { VacationSolicitationsAccordion } from './vacation-solicitations-accordion'
import { TimePunchAdjustmentSolicitationsAccordion } from './time-punch-adjustment-solicitations-accordion'

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
          <Tabs.Item key='day-off' title={<Tabs.Title>Folga</Tabs.Title>}>
            <DayOffSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item key='time-punch-adjustment' title={<Tabs.Title>Ajuste de ponto</Tabs.Title>}>
            <TimePunchAdjustmentSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item
            key='excused-absence'
            title={<Tabs.Title>Abono de falta</Tabs.Title>}
          >
            <ExcusedAbsenceSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item
            key='day-off-schedule'
            title={<Tabs.Title>Escala de folgas</Tabs.Title>}
          >
            <DayOffScheduleAdjustmentSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item key='vacation' title={<Tabs.Title>Férias</Tabs.Title>}>
            <VacationSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item
            key='withdraw'
            title={<Tabs.Title>Afastamento</Tabs.Title>}
          >
            <WithdrawSolicitationsAccordion />
          </Tabs.Item>
        </Tabs.Container>
      </div>
    </div>
  )
}
