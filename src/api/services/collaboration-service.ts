import type { CollaboratorDto } from '@/@core/collaboration/dtos/collaborator-dto'
import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'

export const CollaborationService = (apiClient: IApiClient): ICollaborationService => {
  const MODULE = '/collaboration'

  return {
    async registerCollaborator(collaborator: CollaboratorDto) {
      return await apiClient.post(`${MODULE}/collaborators`, collaborator)
    },

    async getCollaborator(collaboratorId: string) {
      return await apiClient.get<CollaboratorDto>(
        `${MODULE}/collaborators/${collaboratorId}`,
      )
    },

    async listCollaborators({ page, name }) {
      if (name) apiClient.setParam('name', String(name))
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<CollaboratorDto>>(
        `${MODULE}/collaborators`,
      )
    },
  }
}
