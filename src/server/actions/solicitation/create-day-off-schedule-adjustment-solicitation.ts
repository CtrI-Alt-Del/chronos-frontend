import type { Action } from '@/@core/global/interfaces/rpc' 
import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/solicitation/dtos'
import type { ISolicitationService } from '@/@core/solicitation/interfaces' 
import type { Call } from '@/@core/global/interfaces/rpc' 
import { ROUTES } from '@/constants'
type Request = DayOffScheduleAdjustmentSolicitationDto

export const CreateDayOffScheduleAdjustmentSolicitationAction = (
  service: ISolicitationService,
): Action<Request> => {
  return {
    async handle(call: Call<Request>) {
      const solicitation = call.getRequest()
      const response = await service.createDayOffScheduleAdjustmentSolicitation(solicitation)
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.solicitation.solicitations)
    },
  }
}
