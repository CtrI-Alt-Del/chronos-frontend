import { useEffect, useState, type RefObject } from 'react'

export function useTimeLogInput(inputRef: RefObject<HTMLInputElement>) {
  const [isEditing, setIsEditing] = useState(false)

  function handleEditButtonClick() {
    setIsEditing(true)
  }

  function handleConfirmButtonClick() {}

  function handleCancelButtonClick() {
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
  }, [isEditing, inputRef.current])

  return {
    isEditing,
    handleEditButtonClick,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  }
}
