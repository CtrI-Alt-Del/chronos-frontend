import { CACHE } from '@/@core/global/constants'
import type { Action } from '@/@core/global/interfaces/rpc'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'

type Request = {
  justificationTypeId: string
  justificationType: JustificationTypeDto
}
export const UpdateJustificationTypeAction = (
  service: ISolicitationService,
): Action<Request> => {
  return {
    async handle(call) {
      const { justificationTypeId, justificationType } = call.getRequest()
      const response = await service.updateJustificationType(
        justificationType,
        justificationTypeId,
      )
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.solicitation.justificationType.key)
    },
  }
}
