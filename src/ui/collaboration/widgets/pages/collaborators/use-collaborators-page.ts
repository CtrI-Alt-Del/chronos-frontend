import { useState } from 'react'

import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { CACHE } from '@/@core/global/constants'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useRest } from '@/ui/global/hooks/use-rest'

export function useCollaboratorsPage() {
  const { collaborationService,authService } = useApi()
  const [isAlteringCollaboratorStatus, setIsAlteringCollaboratorStatus] =
    useState<boolean>(false)
  const [status, setStatus] = useQueryParamString('active', 'true')
  const { showError, showSuccess } = useToast()

  function handleStatusChange(value: string) {
    setStatus(value)
  }

  async function fetchCollaborators(page: number) {
    const response = await collaborationService.listCollaborators({
      page,
      status: status,
    })
    return response.body
  }
  const {
    data: collaborators,
    isFetching,
    page,
    pagesCount,
    setPage,
    refetch,
  } = usePaginatedCache({
    fetcher: fetchCollaborators,
    dependencies: [status],
    key: CACHE.collaboration.collaborators.key,
  })

  function handlePageChange(page: number) {
    setPage(page)
  }

  function handleRegisterCollaborator() {
    refetch()
  }

  async function handleDisableEmployee(collaboratorId: string) {
    setIsAlteringCollaboratorStatus(true)
    const response = await authService.disable(collaboratorId)
    if (response.isFailure) {
      showError(response.errorMessage)
    }
    if (response.isSuccess) {
      showSuccess('Colaborador desativado com sucesso')
      refetch()
    }

    setIsAlteringCollaboratorStatus(false)
  }
  async function handleEnableEmployee(collaboratorId: string) {
    setIsAlteringCollaboratorStatus(true)
    const response = await authService.enable(collaboratorId)
    if (response.isFailure) {
      showError(response.errorMessage)
      setIsAlteringCollaboratorStatus(false)
    }
    if (response.isSuccess) {
      showSuccess('Colaborador ativado com sucesso')
      refetch()
    }

    setIsAlteringCollaboratorStatus(false)
  }
  return {
    isAlteringCollaboratorStatus,
    page,
    totalPages: pagesCount,
    collaborators,
    isLoadingCollaborators: isFetching || isAlteringCollaboratorStatus,
    status,
    handlePageChange,
    handleRegisterCollaborator,
    handleDisableEmployee,
    handleEnableEmployee,
    handleStatusChange,
  }
}
