import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import type { Call } from '@/@core/global/interfaces/rpc'
import type { WorkLeaveSolicitationDto } from '@/@core/portal/dtos'
import { ROUTES } from '@/constants'

type RequestBody = {
  startedAt: string
  endedAt: string
  description?: string
}

type ResponseBody = WorkLeaveSolicitationDto
export const CreateWithdrawSolicitationAction = (
  service: PortalService,
): Action<RequestBody, ResponseBody> => {
  return {
    async handle(call: Call<RequestBody>) {
      const { startedAt, endedAt, description } = call.getRequest()
      const response = await service.createWithdrawSolicitation(
        startedAt,
        endedAt,
        description,
      )
      if (response.isFailure) response.throwError()
      call.redirect(`${ROUTES.portal.solicitations}?tab=withdraw`)
    },
  }
}
