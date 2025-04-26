import { useCache, useRest } from "@/ui/global/hooks";
import { useRef } from "react";

export function useAttachmentDialog(attachmentKey?:string){
  const {solicitationService} = useRest()
  async function fetcher(){
    if (!attachmentKey) {
      return null
    }
    const response = await solicitationService.getJustificationAttachmentUrl(attachmentKey)
    if (response.isFailure) {
      console.error(response.errorMessage)
    }
    console.log(response.body)
    return response.body
  }
  const {data,isFetching} = useCache({
    fetcher: fetcher,
    key: attachmentKey ?? "",
  })
  const attachmentUrl = data?.url ?? null
  return {
    attachmentUrl,
    isLoading: isFetching,
  }
}
