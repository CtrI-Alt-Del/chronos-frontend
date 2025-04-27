import type { Action } from '@/@core/global/interfaces/rpc'
import type { TimePunchLogAdjustmentSolicitationDto } from '@/@core/solicitation/dtos'
import type { SolicitationService } from '@/@core/solicitation/interfaces'
import { ROUTES } from '@/constants'

type Request = TimePunchLogAdjustmentSolicitationDto

export const CreateTimePunchAdjustmentSolicitationAction = (
  service: SolicitationService,
): Action<Request> => {
  return {
    async handle(call) {
      const solicitation = call.getRequest()
      const response =
        await service.createTimePunchLogAdjustmentSolicitation(solicitation)
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.solicitation.solicitations)
    },
  }
}
