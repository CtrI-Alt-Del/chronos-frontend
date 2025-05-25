import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import type { Call } from '@/@core/global/interfaces/rpc'
import type { ExcusedAbsenceSolicitationDto } from '@/@core/portal/dtos'
type RequestBody = {
  absenceDate: string
}
type ResponseBody = ExcusedAbsenceSolicitationDto
export const CreateExcusedAbsenceSolicitation = (
  service: PortalService,
): Action<RequestBody, ResponseBody> => {
  return {
    async handle(call: Call<RequestBody>) {
      const solicitation = call.getRequest()
      const response = await service.createExcusedAbsenceSolicitation(
        solicitation.absenceDate,
      )
      if (response.isFailure) response.throwError()
      return response.body
    },
  }
}
