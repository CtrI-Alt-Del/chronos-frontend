import { Tabs } from '@/ui/global/widgets/components/tabs'
import { PaidOvertimeSolicitationsAccordion } from './paid-overtime-solicitations-accordion'

export const SolicitationsPageView = () => {
  return (
    <div>
      <div className='px-10 py-4'>
        <Tabs.Container>
          <Tabs.Item key='paid-overtime' title={<Tabs.Title>Hora extra</Tabs.Title>}>
            <PaidOvertimeSolicitationsAccordion />
          </Tabs.Item>
        </Tabs.Container>
      </div>
    </div>
  )
}
