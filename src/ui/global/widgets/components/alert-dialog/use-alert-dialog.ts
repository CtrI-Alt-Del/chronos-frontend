import { useDisclosure } from '@heroui/react'

export function useAlertDialog(onConfirm: VoidFunction, onCancel?: VoidFunction) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  function open() {
    onOpen()
  }

  function handleConfirmButtonClick() {
    onClose()
    onConfirm()
  }

  function handleCancelButtonClick() {
    onClose()
    if (onCancel) onCancel()
  }

  return {
    isOpen,
    open,
    handleOpenChange: onOpenChange,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  }
}
