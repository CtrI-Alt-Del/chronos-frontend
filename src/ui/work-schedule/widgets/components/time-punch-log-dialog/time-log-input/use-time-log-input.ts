import { useEffect, useState, type RefObject } from 'react'

export function useTimeLogInput(
  inputRef: RefObject<HTMLInputElement>,
  onChange: (value: string) => void,
) {
  const [isEditing, setIsEditing] = useState(false)

  function handleEditButtonClick() {
    setIsEditing(true)
  }

  function handleConfirmButtonClick() {
    if (inputRef.current) onChange(inputRef.current.value.slice(0, 5))
  }

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
    value: inputRef.current?.value.slice(0, 5),
    handleEditButtonClick,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  }
}
