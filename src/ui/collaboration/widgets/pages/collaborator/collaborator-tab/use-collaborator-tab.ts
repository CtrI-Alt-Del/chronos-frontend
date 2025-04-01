import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { collaboratorSchema } from '@/validation/schemas/work-schedule'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { useMemo } from 'react'

export type CollaboratorFormData = z.infer<typeof collaboratorSchema>

export function useCollaboratorTab(collaborator?: CollaboratorDto) {
  const { account } = useAuthContext()
  const isAdmin = account?.role.toLowerCase() === 'admin'
  const isManager = account?.role.toLowerCase() === 'admin'

  const defaultValues = useMemo(() => {
    if (isManager && !collaborator)
      return {
        sector: account?.sector,
      }

    if (collaborator) {
      return collaborator
    }
  }, [account, isManager, collaborator])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<CollaboratorFormData>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues,
  })

  async function handleFormSubmit(data: CollaboratorFormData) {}

  return {
    isAdmin,
    isManager,
    formErrors: errors,
    isFormReadOnly: !isAdmin || !isManager,
    isFormSubmitting: isSubmitting,
    isFormDirty: isDirty,
    isFormInvalid: !isValid,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
