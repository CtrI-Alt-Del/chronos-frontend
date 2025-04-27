import { CACHE } from '@/@core/global/constants'
import { useCache } from '@/ui/global/hooks/use-cache'
import { useRest } from '@/ui/global/hooks/use-rest'

export function useJustificationTypeSelect() {
  const { PortalService } = useRest()

  async function fetcher() {
    const response = await PortalService.listJustificationTypes()
    if (response.isFailure) {
      console.error(response.errorMessage)
    }
    return response.body
  }

  const { data, isFetching } = useCache({
    fetcher: fetcher,
    key: CACHE.solicitation.justificationType.key,
  })

  return {
    justificationTypes: data ?? [],
    isLoading: isFetching,
  }
}
