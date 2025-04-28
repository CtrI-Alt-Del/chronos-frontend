import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import { ROUTES } from '@/constants'

export const CreatePaidOvertimeSolicitationAction = (service: PortalService): Action => {
  return {
    async handle(call) {
      const response = await service.createPaidOvertimeSolicitation()
      if (response.isFailure) response.throwError()
      call.redirect(`${ROUTES.portal.solicitations}?tab=paid-overtime`)
    },
  }
}
