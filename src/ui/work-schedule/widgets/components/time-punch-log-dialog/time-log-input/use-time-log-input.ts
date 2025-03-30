import { useState } from 'react'

export function useTimeLogInput(
  defaultValue: string | null,
  onChange: (value: string) => void,
) {
  const [value, setValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(false)

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
    handleInputChange,
    handleEditButtonClick,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  }
}
