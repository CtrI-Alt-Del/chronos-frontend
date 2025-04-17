import type { CollaboratorDto } from '@/@core/collaboration/dtos/collaborator-dto'
import type { RestClient } from '@/@core/global/interfaces/rest/rest-client'
import type { CollaborationService as ICollaborationService } from '@/@core/collaboration/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'

export const CollaborationService = (restClient: RestClient): ICollaborationService => {
  const MODULE = '/collaboration'

  return {
    async createCollaborator(collaborator: CollaboratorDto, accountPassword: string) {
      return await restClient.post(`${MODULE}/collaborators`, {
        collaborator,
        accountPassword,
      })
    },

    async getCollaborator(collaboratorId: string) {
      return await restClient.get<CollaboratorDto>(
        `${MODULE}/collaborators/${collaboratorId}`,
      )
    },

    async updateCollaborator(collaborator: CollaboratorDto) {
      return await restClient.put<CollaboratorDto>(
        `${MODULE}/collaborators/${collaborator.id}`,
        collaborator,
      )
    },

    async listCollaborators({ page, name, status }) {
      restClient.setParam('active', String(status))
      restClient.setParam('page', String(page))
      return await restClient.get<PaginationResponse<CollaboratorDto>>(
        `${MODULE}/collaborators`,
      )
    },
  }
}
