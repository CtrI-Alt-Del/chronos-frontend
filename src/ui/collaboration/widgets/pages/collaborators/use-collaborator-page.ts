import { useQueryParamString } from '@/ui/global/hooks/use-query-param-string'
import { useApi, useCache } from '../../../../global/hooks'
import { PAGINATION, CACHE } from '@/@core/global/constants'
import { useQueryParamNumber } from '@/ui/global/hooks/use-query-param-number'
import { usePaginatedCache } from '@/ui/global/hooks/use-paginated-cache'
import { useState } from 'react'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useCollaboratorsPage() {
  const { collaborationService } = useApi()
  const [isAlteringCollaboratorStatus, setIsAlteringCollaboratorStatus] =
    useState<boolean>(false)
  const [statusSearchValue, setStatusSearchValue] = useQueryParamString('active')
  const { showError, showSuccess } = useToast()


  function handleStatusSearchValueChange(value: string) {
    setStatusSearchValue(value)
  }
  async function fetchCollaborators(page: number) {
    const response = await collaborationService.listCollaborators({
      page,
      status: statusSearchValue,
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
    itemsCount,
  } = usePaginatedCache({
    fetcher: fetchCollaborators,
    dependencies: [statusSearchValue],
    key: CACHE.collaboration.collaborator.key,
  })
  function handlePageChange(page: number) {
    setPage(page)
  }
  function handleRegisterCollaborator() {
    refetch()
  }

  async function handleDisableEmployee(collaboratorId: string) {
    setIsAlteringCollaboratorStatus(true)
    const response = await collaborationService.disableCollaborator(collaboratorId)
    if (response.isFailure) {
      showError(response.errorMessage)
      setIsAlteringCollaboratorStatus(false)
      return
    }
    if (response.isSuccess) {
      showSuccess('Colaborador desativado com sucesso')
      refetch()
    }
    setIsAlteringCollaboratorStatus(false)
  }
  async function handleEnableEmployee(collaboratorId: string) {
    setIsAlteringCollaboratorStatus(true)
    const response = await collaborationService.enableCollaborator(collaboratorId)
    if (response.isFailure) {
      showError(response.errorMessage)
      setIsAlteringCollaboratorStatus(false)
      return
    }
    if (response.isSuccess) {
      showSuccess('Colaborador ativado com sucesso')
      refetch()
    }
    setIsAlteringCollaboratorStatus(false)
  }
  const totalItems = itemsCount
  return {
    isAlteringCollaboratorStatus,
    page,
    totalPages: Math.ceil(totalItems / PAGINATION.itemsPerPage),
    collaborators,
    isFetching,
    handlePageChange,
    handleRegisterCollaborator,
    handleDisableEmployee,
    handleEnableEmployee,
    handleStatusSearchValueChange,
    statusSearchValue
  }
}
