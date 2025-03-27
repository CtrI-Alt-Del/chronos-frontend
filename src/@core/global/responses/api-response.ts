import { HTTP_STATUS_CODE } from '../constants'
import { HTTP_HEADERS } from '../constants/http-headers'
import { ApiError } from '../errors/api-error'
import { AppError } from '../errors/app-error'

type ApiResponseProps<Body> = {
  body?: Body
  statusCode?: number
  errorMessage?: string
  headers?: Record<string, string>
}

export class ApiResponse<Body = unknown> {
  private readonly _body: Body | null
  private readonly _statusCode: number
  private readonly _errorMessage: string | null
  readonly headers: Record<string, string> = {}

  constructor({ body, statusCode, errorMessage }: ApiResponseProps<Body>) {
    this._body = body ?? null
    this._statusCode = statusCode ?? HTTP_STATUS_CODE.ok
    this._errorMessage = errorMessage ?? null
  }

  throwError() {
    throw new ApiError(this.errorMessage, this.statusCode)
  }

  getHeader(key: string) {
    return this.headers[key] ?? null
  }

  get isSuccess() {
    console.log(this.statusCode)
    return this.statusCode <= HTTP_STATUS_CODE.badRequest
  }

  get isFailure() {
    return this.statusCode >= HTTP_STATUS_CODE.badRequest
  }

  get body(): Body {
    if (this._body === null) {
      throw new AppError('Api response error', 'Response is an error')
    }

    return this._body
  }

  get statusCode(): number {
    return this._statusCode
  }

  get errorMessage(): string {
    if (!this._errorMessage) {
      throw new AppError('Api response error', 'Response is not an error')
    }

    return this._errorMessage
  }

  get isRedirecting() {
    return (
      this.statusCode === HTTP_STATUS_CODE.redirect &&
      this.getHeader(HTTP_HEADERS.location)
    )
  }
}
