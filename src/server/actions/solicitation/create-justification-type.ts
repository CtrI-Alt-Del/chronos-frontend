import type { Action } from "@/@core/global/interfaces/rpc";
import type { JustificationTypeDto } from "@/@core/solicitation/dtos";
import type { ISolicitationService } from "@/@core/solicitation/interfaces";

type Request = JustificationTypeDto 
export const CreateJustificationTypeAction = (service: ISolicitationService): Action<Request> => {
  return {
    async handle(call) {
      const justificationType = call.getRequest()
      const response = await service.createJustificationType(justificationType)
      if (response.isFailure) response.throwError()
        
    },
  }
}
