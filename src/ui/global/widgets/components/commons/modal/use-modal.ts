import { useDisclosure } from "@heroui/modal"

export function useModal(onOpenModal?: () => void) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  function open() {
    onOpen()
    if (onOpenModal) onOpenModal()
  }

  function close() {
    onClose()
  }

  return {
    isOpen,
    open,
    close,
  }
}
