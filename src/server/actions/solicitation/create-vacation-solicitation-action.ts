import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import type { Call } from '@/@core/global/interfaces/rpc'
import { ROUTES } from '@/constants'

type RequestBody = {
  startedAt: string
  endedAt: string
  description?: string
}

export const CreateVacationSolicitationAction = (
  service: PortalService,
): Action<RequestBody> => {
  return {
    async handle(call: Call<RequestBody>) {
      const solicitation = call.getRequest()
      const response = await service.createVacationSolicitation(
        solicitation.startedAt,
        solicitation.endedAt,
        solicitation.description,
      )
      if (response.isFailure) response.throwError()
      call.redirect(`${ROUTES.portal.solicitations}?tab=vacation`)
    },
  }
}
