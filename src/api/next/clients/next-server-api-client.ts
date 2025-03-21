import { NextApiClient } from "./next-api-client"

export const NextServerApiClient = async () => {
  const apiClient = NextApiClient()
  apiClient.setBaseUrl('http://localhost:8080')

  return apiClient
}
