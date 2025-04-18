import { CACHE } from '@/@core/global/constants'
import type { Action } from '@/@core/global/interfaces/rpc'
import type { IJustificationTypeService } from '@/@core/solicitation/interfaces'

type Request = {
  justificationTypeId: string
}
export const DeleteJustificationTypeAction = (
  service: IJustificationTypeService,
): Action<Request> => {
  return {
    async handle(call) {
      const { justificationTypeId } = call.getRequest()
      const response = await service.deleteJustificationType(justificationTypeId)
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.solicitation.justificationType.key)
    },
  }
}
