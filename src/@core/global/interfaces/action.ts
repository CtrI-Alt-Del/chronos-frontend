import type { IActionServer } from './action-server'

export interface IAction<Request = void, Response = void> {
  handle(actionServer: IActionServer<Request>): Promise<Response>
}
