import type { RestClient } from '@/@core/global/interfaces/rest'
import type { IJustificationTypeService } from '@/@core/solicitation/interfaces'

export const JustificaionTypeService = (
  restClient: RestClient,
): IJustificationTypeService => {
  const MODULE = 'solicitation'
  return {
    async listJustificationTypes() {
      return await restClient.get(`${MODULE}/justification-type`)
    },
    async createJustificationType(justificationType) {
      return await restClient.post(`${MODULE}/justification-type`, justificationType)
    },
    async updateJustificationType(justificationType, id) {
      return await restClient.put(`${MODULE}/justification-type/${id}`, justificationType)
    },
    async deleteJustificationType(id) {
      return await restClient.delete(`${MODULE}/justification-type/${id}`)
    },
  }
}
