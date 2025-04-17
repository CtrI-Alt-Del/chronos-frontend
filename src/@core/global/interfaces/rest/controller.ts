import type { ApiResponse } from '../../responses'
import type { HttpSchema, Http } from './http'

export interface Controller<ControllerHttpSchema extends HttpSchema = HttpSchema> {
  handle(http: Http<ControllerHttpSchema>): Promise<ApiResponse>
}
