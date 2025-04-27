import { CACHE } from '@/@core/global/constants'
import type { Action } from '@/@core/global/interfaces/rpc'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import type { PortalService } from '@/@core/portal/interfaces'

export const ListJustificationTypesAction = (
  service: PortalService,
): Action<void, JustificationTypeDto[]> => {
  return {
    async handle() {
      const response = await service.listJustificationTypes()
      const result = response?.body
      return result
    },
  }
}
