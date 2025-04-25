import { CACHE } from "@/@core/global/constants";
import { useCache, useRest } from "@/ui/global/hooks";

export function useJustificationTypeSelect(){
  const {solicitationService} = useRest()
  async function fetcher(){
    const response = await solicitationService.listJustificationTypes()
    if (response.isFailure) {
      console.error(response.errorMessage)
    }
    return response.body
  }
  const {data,isFetching} = useCache({
    fetcher: fetcher,
    key: CACHE.solicitation.justificationType.key,
  })
  return {
    justificationTypes: data ?? [],
    isLoading: isFetching,
  }
}
