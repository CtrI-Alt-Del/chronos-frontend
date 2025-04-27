import type { Action } from '@/@core/global/interfaces/rpc'
import type { SolicitationService } from '@/@core/solicitation/interfaces'
import { ROUTES } from '@/constants'
import type { Call } from '@/@core/global/interfaces/rpc'
type RequestBody = {
  dayOff: string
  justificationType: {
    id: string
    name: string
    needsAttachment: string
  }
  description: string
  file?: File
}
export const CreateDayOffSolicitationAction = (
  service: SolicitationService,
): Action<RequestBody> => {
  return {
    async handle(call: Call<RequestBody>) {
      const solicitation = call.getRequest()
      const response = await service.createDayOffSolicitation(
        solicitation.dayOff,
        solicitation.justificationType.id,
        solicitation.description,
        solicitation.justificationType.name,
        solicitation.justificationType.needsAttachment,
        solicitation.file,
      )
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.solicitation.solicitations)
    },
  }
}
