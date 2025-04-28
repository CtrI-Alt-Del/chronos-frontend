import { useCache } from '@/ui/global/hooks/use-cache'
import { useRest } from '@/ui/global/hooks/use-rest'

export function useAttachmentDialog(attachmentKey?: string) {
  const { portalService } = useRest()
  async function fetcher() {
    if (!attachmentKey) {
      return null
    }
    const response = await portalService.getJustificationAttachmentUrl(attachmentKey)
    return response.body
  }
  const { data, isFetching } = useCache({
    fetcher: fetcher,
    key: attachmentKey ?? '',
  })
  const attachmentUrl = data?.url ?? null
  return {
    attachmentUrl,
    isLoading: isFetching,
  }
}
