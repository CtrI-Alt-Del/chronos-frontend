import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import type { Call } from '@/@core/global/interfaces/rpc'
import type { WithdrawSolicitationDto } from '@/@core/portal/dtos'
type RequestBody = {
  withdrawalDays: string[]
}
type ResponseBody = WithdrawSolicitationDto
export const CreateWithdrawSolicitationAction = (
  service: PortalService,
): Action<RequestBody, ResponseBody> => {
  return {
    async handle(call: Call<RequestBody>) {
      const solicitation = call.getRequest()
      const response = await service.createWithdrawSolicitation(
        solicitation.withdrawalDays,
      )
      if (response.isFailure) response.throwError()
      return response.body
    },
  }
}
