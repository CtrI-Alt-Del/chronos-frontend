import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import { ROUTES } from '@/constants'
import type { Call } from '@/@core/global/interfaces/rpc'
type RequestBody = {
  dayOff: string
  workload?: number
}
export const CreateDayOffSolicitationAction = (
  service: PortalService,
): Action<RequestBody> => {
  return {
    async handle(call: Call<RequestBody>) {
      const solicitation = call.getRequest()
      const response = await service.createDayOffSolicitation(
        solicitation.dayOff,
        solicitation.workload as number,
      )
      if (response.isFailure) response.throwError()
      call.redirect(`${ROUTES.portal.solicitations}?tab=day-off`)
    },
  }
}
