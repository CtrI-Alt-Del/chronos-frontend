import { NextServerApiClient } from "@/api/next/clients/next-server-api-client";
import { NextActionServer } from "../next/next-server-action";
import { authActionClient } from "./clients/auth-action-client";
import { SolicitationService } from "@/api/services";
import { CreateDayOffScheduleAdjustmentSolicitation } from "../actions/solicitation";
import { dayOffScheduleAdjustmentSolicitationSchema } from "@/validation/schemas/solicitation";

export const createDayOffScheduleAdjustmentSolicitation = authActionClient
.schema(dayOffScheduleAdjustmentSolicitationSchema)
.action(
  async ({ctx,clientInput}) => {
    const actionServer = NextActionServer({
      request: clientInput,
      account: ctx.account
    })
    const apiClient = await NextServerApiClient({isCacheEnabled:false})
    const service = SolicitationService(apiClient)
    const action = CreateDayOffScheduleAdjustmentSolicitation(service)
    return action.handle(actionServer)
  }
)
