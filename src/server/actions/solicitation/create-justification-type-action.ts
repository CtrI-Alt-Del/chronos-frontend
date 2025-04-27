import { CACHE } from '@/@core/global/constants'
import type { Action } from '@/@core/global/interfaces/rpc'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import type { PortalService } from '@/@core/portal/interfaces'

type Request = JustificationTypeDto
export const CreateJustificationTypeAction = (
  service: PortalService,
): Action<Request> => {
  return {
    async handle(call) {
      const justificationType = call.getRequest()
      const response = await service.createJustificationType(justificationType)
      if (response.isFailure) response.throwError()
      call.resetCache(CACHE.solicitation.justificationType.key)
    },
  }
}
