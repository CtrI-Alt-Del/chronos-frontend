import { CACHE } from '@/@core/global/constants'
import type { Action } from '@/@core/global/interfaces/rpc'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'
import type { SolicitationService } from '@/@core/solicitation/interfaces'

export const ListJustificationTypesAction = (
  service: SolicitationService,
): Action<void, JustificationTypeDto[]> => {
  return {
    async handle() {
      const response = await service.listJustificationTypes()
      const result = response?.body
      return result
    },
  }
}
