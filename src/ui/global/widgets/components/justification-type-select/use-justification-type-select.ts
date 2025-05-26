import { CACHE } from '@/@core/global/constants'
import { useCache } from '@/ui/global/hooks/use-cache'
import { useRest } from '@/ui/global/hooks/use-rest'
import type { JustificationTypeDto } from '@/@core/portal/dtos'

export function useJustificationTypeSelect(
  onSelect: (justificationType: JustificationTypeDto) => void,
) {
  const { portalService } = useRest()

  async function fetchJustificationTypes() {
    const response = await portalService.listJustificationTypes()
    if (response.isFailure) {
      console.error(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetchJustificationTypes,
    key: CACHE.portal.justificationType.key,
  })

  function handleSelectionChange(id: string) {
    if (!data) return
    const selected = data.find((justication) => justication.id === id)
    if (selected) onSelect(selected)
  }

  return {
    justificationTypes: data ?? [],
    isLoading: isFetching,
    handleSelectionChange,
  }
}
