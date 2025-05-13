import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'

export function useSolicitationsPage() {
  const [activeTab, setActiveTab] = useQueryParamString('tab', 'day-off')

  function handleTabChange(tab: string) {
    setActiveTab(tab)
  }

  return {
    activeTab,
    handleTabChange,
  }
}
