import { Button } from "@heroui/button"
import { DateRangePicker } from "@heroui/date-picker"
import Link from "next/link"

import { SolicitationAccordion } from "./solicitation-accordion"

export const SolicitationsPage = () => {
  return (
    <div>
      <div className="flex px-4 md:px-10 pt-8 pb-2 justify-between md:flex items-end gap-4">
        <div className="flex">
          <DateRangePicker className="max-w-xs" size="sm" label="Período" labelPlacement="outside" />
        </div>
        <div>
          <Button as={Link} href="" color="primary">Nova Solicitação</Button>
        </div>
      </div>
      <div className="px-10 py-4">
        <SolicitationAccordion />
      </div>
    </div>
  )
}
