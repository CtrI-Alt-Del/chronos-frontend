import type { IAction, IActionServer } from '@/@core/global/interfaces'
import type { SolicitationDto } from '@/@core/solicitation/dtos'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'


type Request = {
  id?:string
  status: "DENIED" | "APPROVED"
  feedbackMessage?: string
  type: "DAY_OFF_SCHEDULE" | "TIME_PUNCH"
  collaboratorId: string
}
export const ResolveSolicitation = (service: ISolicitationService): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const solicitation = actionServer.getRequest()
      const response = await service.resolveSolicitation(
        solicitation.id as string,
        solicitation.status,
        solicitation.type
      )
      if (response.isFailure) response.throwError()
      if (response.isSuccess && solicitation.type == 'DAY_OFF_SCHEDULE') {
        actionServer.redirect(
          `/collaboration/collaborators/${solicitation.collaboratorId}`,
        )
      }
      if (response.isSuccess && solicitation.type == 'TIME_PUNCH') {
        actionServer.redirect(`/work-schedule/sector-history`)
      }
    },
  }
}
