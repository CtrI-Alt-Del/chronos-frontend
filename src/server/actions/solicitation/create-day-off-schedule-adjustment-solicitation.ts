import type { IAction } from '@/@core/global/interfaces'
import type { DayOffScheduleAdjustmentSolicitationDto } from '@/@core/solicitation/dtos'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'
import type { IActionServer } from '@/@core/global/interfaces/action-server'
import { ROUTES } from '@/constants'
type Request = DayOffScheduleAdjustmentSolicitationDto

export const CreateDayOffScheduleAdjustmentSolicitation = (
  service: ISolicitationService,
): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const solicitation = actionServer.getRequest()
      const response = await service.createDayOffScheduleAdjustmentSolicitation(solicitation)
      if (response.isFailure) response.throwError()
      actionServer.redirect(ROUTES.solicitation.solicitations)
    },
  }
}
