import { useState } from 'react'

export function useAttachmentUploadModal(workdayLogId: string) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return {
    selectedFile,
    isLoading,
    handleFileChange,
    handleSubmit,
  }
}
