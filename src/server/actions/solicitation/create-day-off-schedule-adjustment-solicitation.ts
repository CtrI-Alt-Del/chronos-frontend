import type { Action } from '@/@core/global/interfaces/rpc'
import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/portal/dtos'
import type { PortalService } from '@/@core/portal/interfaces'
import type { Call } from '@/@core/global/interfaces/rpc'
import { ROUTES } from '@/constants'
type Request = DayOffScheduleAdjustmentSolicitationDto

export const CreateDayOffScheduleAdjustmentSolicitationAction = (
  service: PortalService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const solicitation = call.getRequest()
      const response =
        await service.createDayOffScheduleAdjustmentSolicitation(solicitation)
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.portal.solicitations)
    },
  }
}
