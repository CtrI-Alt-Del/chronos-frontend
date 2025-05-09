import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUpdatePasswordAction } from './use-update-password-action'
import { passwordSchema } from '@/validation/schemas/global/password-schema'

const passwordFormSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas devem ser iguais',
    path: ['passwordConfirmation'],
  })

export type PasswordFormData = z.infer<typeof passwordFormSchema>

export function usePasswordFormDialog(collaboratorId: string) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
  })
  const { updatePassword, isUpdating } = useUpdatePasswordAction(collaboratorId)

  async function handleFormSubmit(data: PasswordFormData) {
    await updatePassword(data.password)
  }

  return {
    errors,
    isSubmitting: isUpdating || isSubmitting,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
