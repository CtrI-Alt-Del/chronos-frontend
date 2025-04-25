import { CACHE } from '@/@core/global/constants'
import type { Action,Call } from '@/@core/global/interfaces/rpc' 
import type { SolicitationDto } from '@/@core/solicitation/dtos'
import type { ISolicitationService } from '@/@core/solicitation/interfaces'


type Request = {
  id?:string
  status: "DENIED" | "APPROVED"
  feedbackMessage?: string
  type: "DAY_OFF_SCHEDULE" | "TIME_PUNCH" | "DAY_OFF"
  collaboratorId: string
}
export const ResolveSolicitationAction = (service: ISolicitationService): Action<Request> => {
  return {
    async handle(actionServer: Call<Request>) {
      const solicitation = actionServer.getRequest()
      const response = await service.resolveSolicitation(
        solicitation.id as string,
        solicitation.status,
        solicitation.type
      )
      if (response.isFailure) response.throwError()
      actionServer.resetCache(CACHE.solicitation.solicitations.key)
      if (response.isSuccess && solicitation.type == 'DAY_OFF_SCHEDULE') {
        actionServer.redirect(
          `/collaboration/collaborators/${solicitation.collaboratorId}?tab=day-off-schedule-tab`,
        )
      }
      if (response.isSuccess && solicitation.type == 'TIME_PUNCH') {
        actionServer.redirect(`/work-schedule/sector-history`)
      }
    },
  }
}
