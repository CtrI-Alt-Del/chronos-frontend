import { Tabs } from '@/ui/global/widgets/components/tabs'
import { PaidOvertimeSolicitationsAccordion } from './paid-overtime-solicitations-accordion'

export const SolicitationsPageView = () => {
  return (
    <div>
      <div className='px-10 py-4'>
        <Tabs.Container>
          <Tabs.Item
            key='excused-absence'
            title={<Tabs.Title>Abono de falta</Tabs.Title>}
          >
            <PaidOvertimeSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item key='day-off' title={<Tabs.Title>Folga</Tabs.Title>}>
            <PaidOvertimeSolicitationsAccordion />
          </Tabs.Item>
          <Tabs.Item key='paid-overtime' title={<Tabs.Title>Hora extra</Tabs.Title>}>
            <PaidOvertimeSolicitationsAccordion />
          </Tabs.Item>
        </Tabs.Container>
      </div>
    </div>
  )
}
