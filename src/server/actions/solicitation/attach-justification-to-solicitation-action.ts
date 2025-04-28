import type { Action } from '@/@core/global/interfaces/rpc'
import type { PortalService } from '@/@core/portal/interfaces'
import { ROUTES } from '@/constants'

type RequestBody = {
  solicitationId: string
  justificationTypeId: string
  justificationTypeName: string
  justificationTypeShouldHaveAttachment: string
  description: string
  attachment?: File
}
export const AttachJustificationToSolicitationAction = (
  service: PortalService,
): Action<RequestBody> => {
  return {
    async handle(call) {
      const body = call.getRequest()
      const response = await service.attachJustificationToSolicitation(
        body.solicitationId,
        body.justificationTypeId,
        body.justificationTypeName,
        body.justificationTypeShouldHaveAttachment,
        body.description,
        body.attachment,
      )
      if (response.isFailure) response.throwError()
      call.redirect(ROUTES.portal.solicitations)
    },
  }
}
