import { useAuthContext } from '@/ui/auth/contexts/auth-context/auth-context'
import { useState } from 'react'

export function useTimeLogInput(
  defaultValue: string | null,
  onChange: (value: string) => void,
) {
  const [value, setValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(false)
  const { account } = useAuthContext()

  function handleEditButtonClick() {
    setIsEditing(true)
  }

  function handleConfirmButtonClick() {
    if (value) {
      onChange(value)
    }
  }

  function handleInputChange(value: string) {
    setValue(value)
  }

  function handleCancelButtonClick() {
    setIsEditing(false)
    setValue(defaultValue)
  }

  return {
    isEditing,
    value,
    isEnable: account?.role === 'manager',
    handleInputChange,
    handleEditButtonClick,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  }
}
