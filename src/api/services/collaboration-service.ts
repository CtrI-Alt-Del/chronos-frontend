import type { CollaboratorDto } from '@/@core/collaboration/dtos/collaborator-dto'
import type { IApiClient } from '@/@core/global/interfaces/api-client'
import type { ICollaborationService } from '@/@core/collaboration/interfaces'
import type { PaginationResponse } from '@/@core/global/responses'

export const CollaborationService = (apiClient: IApiClient): ICollaborationService => {
  const MODULE = '/collaboration'

  return {
    async createCollaborator(collaborator: CollaboratorDto) {
      return await apiClient.post(`${MODULE}/collaborators`, collaborator)
    },

    async getCollaborator(collaboratorId: string) {
      return await apiClient.get<CollaboratorDto>(
        `${MODULE}/collaborators/${collaboratorId}`,
      )
    },

    async updateCollaborator(collaborator: CollaboratorDto, workScheduleId: string) {
      return await apiClient.put<CollaboratorDto>(
        `${MODULE}/collaborators/${collaborator.id}`,
        {
          collaboratorDto: collaborator,
          workScheduleId,
        },
      )
    },

    async listCollaborators({ page, name,status }) {
      apiClient.setParam('active',String(status))
      apiClient.setParam('page', String(page))
      return await apiClient.get<PaginationResponse<CollaboratorDto>>(
        `${MODULE}/collaborators`,
      )
    },

    async enableCollaborator(collaboratorId) {
      return await apiClient.patch(`${MODULE}/enable/${collaboratorId}`)
    },

    async disableCollaborator(collaboratorId) {
      return await apiClient.patch(`${MODULE}/disable/${collaboratorId}`)
    },
  }
}
