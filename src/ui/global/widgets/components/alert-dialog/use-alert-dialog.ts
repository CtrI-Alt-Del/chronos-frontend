import { useDisclosure } from '@heroui/react'

export function useAlertDialog(onConfirm: VoidFunction) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  function open() {
    onOpen()
  }

  function handleConfirmButton() {
    onClose()
    onConfirm()
  }

  return {
    isOpen,
    open,
    handleOpenChange: onOpenChange,
    handleConfirmButton,
  }
}
