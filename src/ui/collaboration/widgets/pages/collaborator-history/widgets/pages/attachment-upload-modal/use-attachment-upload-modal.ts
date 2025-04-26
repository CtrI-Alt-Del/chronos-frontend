import { useState } from 'react'

export function useAttachmentUploadModal(workdayLogId: string) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  //fazer a action de upload do atestado pra usar aqui qnd o back tiver pronto

  const handleFileChange = (file: File) => {
    setSelectedFile(file)
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Nenhum arquivo selecionado')
      return false
    }

    setIsLoading(true)

    const formData = new FormData()
    formData.append('workdayLogId', workdayLogId)
    formData.append('attachment', selectedFile)
  }

  return {
    selectedFile,
    isLoading,
    handleFileChange,
    handleSubmit,
  }
}
