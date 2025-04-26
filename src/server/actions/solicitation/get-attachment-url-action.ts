import type { Action } from '@/@core/global/interfaces/rpc'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'

type RequestBody = {
  attachmentKey: string
}
type ResponseBody = {
  url: string
}
export const GetAttachmentUrlAction = (
  service: ISolicitationService,
): Action<RequestBody, ResponseBody> => {
  return {
    async handle(call) {
      const { attachmentKey } = call.getRequest()
      const response = await service.getJustificationAttachmentUrl(attachmentKey)
      if (response.isFailure) response.throwError()
      return {
        url: response.body
      }
    },
  }
}
