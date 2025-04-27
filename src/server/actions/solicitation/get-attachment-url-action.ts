import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'

type RequestBody = {
  attachmentKey: string
}
type ResponseBody = {
  url: string
}
export const GetAttachmentUrlAction = (
  service: PortalService,
): Action<RequestBody, ResponseBody> => {
  return {
    async handle(call) {
      const { attachmentKey } = call.getRequest()
      const response = await service.getJustificationAttachmentUrl(attachmentKey)
      if (response.isFailure) response.throwError()
      return {
        url: response.body,
      }
    },
  }
}
