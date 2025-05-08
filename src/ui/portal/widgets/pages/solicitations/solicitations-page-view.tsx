import { Tabs } from '@/ui/global/widgets/components/tabs'
import { PaidOvertimeSolicitationsAccordion } from './paid-overtime-solicitations-accordion'
import { ExcusedAbsenceSolicitationsAccordion } from './excused-absence-solicitations-accordion'
import { DayOffSolicitationsAccordion } from './day-off-solicitations-accordion'
import { Button } from '@heroui/button'
import { Spinner } from '@heroui/spinner'

type Props = {
  activeTab: string
  onTabChange: (tab: string) => void
  currentPage: number
  totalPages: number
  hasMorePages: boolean
  isFetching: boolean
  onPreviousPage: () => void
  onNextPage: () => void
}

export const SolicitationsPageView = ({ 
  activeTab, 
  onTabChange,
  currentPage,
  totalPages,
  hasMorePages,
  isFetching,
  onPreviousPage,
  onNextPage
}: Props) => {
  const displayPage = totalPages > 0 ? Math.min(currentPage, totalPages) : currentPage;
  
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
        
        <div className="flex justify-between items-center px-4 mt-8">
          <Button 
            variant="bordered" 
            isDisabled={currentPage <= 1 || isFetching}
            onPress={onPreviousPage}
            className="flex gap-2 items-center"
          >
            <span>Anterior</span>
          </Button>
          <div className="flex gap-2 items-center text-sm text-slate-600">
            {isFetching && <Spinner size="sm" />}
            Página {displayPage} de {totalPages || 1}
          </div>
          <Button 
            variant="bordered"
            isDisabled={!hasMorePages || isFetching}
            onPress={onNextPage}
            className="flex gap-2 items-center"
          >
            <span>Próxima</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
