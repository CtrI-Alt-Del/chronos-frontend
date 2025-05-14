import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import type { Call } from '@/@core/global/interfaces/rpc'
import { ROUTES } from '@/constants'
import type{ DayOffScheduleDto } from '@/@core/work-schedule/dtos'
type Request = {
  dayOffSchedule: DayOffScheduleDto
}

export const CreateDayOffScheduleAdjustmentSolicitationAction = (
  service: PortalService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const solicitation = call.getRequest()
      const response =
        await service.createDayOffScheduleAdjustmentSolicitation(solicitation.dayOffSchedule)
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.portal.solicitations)
    },
  }
}
