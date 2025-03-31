import type { CollaboratorDto } from '@/@core/collaboration/dtos/collaborator-dto'
import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'

export const CollaborationService = (apiClient: IApiClient): ICollaborationService => {
  const MODULE = '/collaboration'

  return {
    async createCollaborator(collaborator: CollaboratorDto, password: string) {
      return await apiClient.post(`${MODULE}/collaborators`, {
        collaboratorDto: collaborator,
        password,
      })
    },

    async getCollaborator(collaboratorId: string) {
      return await apiClient.get<CollaboratorDto>(
        `${MODULE}/collaborators/${collaboratorId}`,
      )
    },

    async updateCollaborator(collaboratorId: string, collaboratorDto: CollaboratorDto) {
      return await apiClient.put<CollaboratorDto>(
        `${MODULE}/collaborators/${collaboratorId}`,
        collaboratorDto,
      )
    },

    async listCollaborators({ page, name, status }) {
      apiClient.setParam('active', String(status))
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<CollaboratorDto>>(
        `${MODULE}/collaborators`,
      )
    },

    async enableCollaborator(collaboratorId) {
      return await apiClient.patch(`${MODULE}/collaborators/${collaboratorId}/enable`)
    },

    async disableCollaborator(collaboratorId) {
      return await apiClient.patch(`${MODULE}/collaborators/${collaboratorId}/disable`)
    },
  }
}
