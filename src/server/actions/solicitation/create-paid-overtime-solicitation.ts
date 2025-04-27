import type { Action } from '@/@core/global/interfaces/rpc'
import type { SolicitationService } from '@/@core/solicitation/interfaces'
import { ROUTES } from '@/constants'

export const CreatePaidOvertimeSolicitationAction = (
  service: SolicitationService,
): Action => {
  return {
    async handle(call) {
      const response = await service.createPaidOvertimeSolicitation()
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.solicitation.solicitations)
    },
  }
}
