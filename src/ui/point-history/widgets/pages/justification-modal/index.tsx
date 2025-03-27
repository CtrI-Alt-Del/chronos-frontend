import { Button } from "@heroui/button"
import { Divider } from "@heroui/divider"
import { Input, Textarea } from "@heroui/input"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal"
import { Select, SelectItem } from "@heroui/select"
import { useRef, useState } from "react"

export const JustificationModal = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) => {
  const options = [
    { key: "1", label: "Acordei atrasado" },
    { key: "2", label: "Problema de saúde" },
    { key: "3", label: "Transito" },
  ]

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file ? file.name : null)
  }

  return (
    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center text-2xl font-semibold">Justificativa Falta</ModalHeader>

            <ModalBody>
              <div className="flex justify-center text-xl font-semibold">
                Dia: 08/05/2025
              </div>

              <Divider />

              <div className="flex justify-center items-center flex-col gap-8 mx-8 my-4">
                <Select
                  className="max-w-xs"
                  label={
                    <span className='text-xl font-semibold'>Selecione</span>
                  }
                  placeholder="Selecione um problema"
                  selectionMode="single"
                >
                  {options.map((option) => (
                    <SelectItem key={option.key}>{option.label}</SelectItem>
                  ))}
                </Select>

                <div className="max-w-80 w-80 rounded-xl px-2 bg-gray-100 hover:bg-gray-200">
                  <p className="text-base px-1 text-gray-600 font-semibold">Documento</p>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button className="mb-2 p-2 bg-transparent text-base" onPress={() => fileInputRef.current?.click()} color="default" size="sm">
                    Escolher Arquivo
                  </Button>
                  {selectedFile && <p className="mb-2 px-2 text-nowrap">{selectedFile}</p>}
                </div>

                <div>
                  <Textarea
                    className="max-w-80 w-80 max-h-full flex flex-wrap md:flex-nowrap"
                    label={
                      <span className='text-xl font-semibold'>Observação</span>
                    }
                    minRows={6}
                    placeholder="Insira a observação"
                  />
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-center items-center pb-6">
                <Button className="w-40" color="primary" onPress={onClose}>
                  Enviar
                </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
