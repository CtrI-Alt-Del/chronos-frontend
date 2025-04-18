import type { Call } from './call'

export interface Action<Request = void, Response = void> {
  handle(call: Call<Request>): Promise<Response>
}
