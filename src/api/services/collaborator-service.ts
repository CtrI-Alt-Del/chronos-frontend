import type { CollaboratorDto } from "@/@core/collaboration/dtos/collaborator-dto";
import type { IApiClient } from "@/@core/global/interfaces/api-client";
import type { ICollaboratorService } from "@/@core/collaboration/interfaces";
import type { PaginationResponse } from "@/@core/global/responses";

export const CollaboratorService = (apiClient: IApiClient): ICollaboratorService => {
    return {
        async registerCollaborator(collaborator: CollaboratorDto) {
            return await apiClient.post('/collaborator', collaborator)
        },
        async getCollaborator(locationId: string) {
            return await apiClient.get<CollaboratorDto>(`/collaborator/${locationId}`)
          },
        async listCollaborators({ page, name }) {
            if (name) apiClient.setParam('name', String(name))
            apiClient.setParam('page', String(page))
            return await apiClient.get<PaginationResponse<CollaboratorDto>>('/collaborator')
          },
    }
}