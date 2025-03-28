import { ApiResponse } from '@/@core/global/responses'

export function handleApiError<Body>(error: object, statusCode: number) {
  if ('title' in error && 'message' in error) {
    console.log(error)
    console.log(`Api error title: ${error.title}`)
    console.log(`Api error message: ${error.message}`)
    return new ApiResponse({
      errorMessage: String(error.message),
      statusCode,
    }) as ApiResponse<Body>
  }

  console.error(error)

  return new ApiResponse({
    errorMessage: 'Unknown api error',
    statusCode,
  }) as ApiResponse<Body>
}
