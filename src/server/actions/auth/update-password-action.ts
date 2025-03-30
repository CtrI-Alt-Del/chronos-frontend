import type { IAuthService } from '@/@core/global/interfaces'
import type { IAction } from '@/@core/global/interfaces/action'
import type { IActionServer } from '@/@core/global/interfaces/action-server'

type Request = {
  collaboratorId: string
  password: string
}

export const UpdatePasswordAction = (service: IAuthService): IAction<Request> => {
  return {
    async handle(actionServer: IActionServer<Request>) {
      const { collaboratorId, password } = actionServer.getRequest()
      const response = await service.updatePassword(collaboratorId, password)
      if (response.isFailure) response.throwError()
    },
  }
}
