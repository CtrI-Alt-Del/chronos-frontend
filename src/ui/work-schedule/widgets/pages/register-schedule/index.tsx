import { Button } from "@heroui/button"
import Link from "next/link"

import { Calendar } from "./calendar"
import { CreateWorkSchedule } from "./create-work-schedule"

export const RegisterSchedulePage = () => {
  return (
    <div className="p-6 rounded-lg border border-gray-border">
      <span className="font-bold text-lg md:text-xl lg:text-2xl">Registro de Horário</span>
      <div className="flex flex-col my-4 mx-4 md:mx-20 max-w-[480px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-full">
        <CreateWorkSchedule />
      </div>

      <div className="py-4 max-w-[480px] sm:max-w-[520px] md:max-w-[680px] lg:max-w-full">
        <span className="font-bold text-lg md:text-xl lg:text-2xl">Registro de Dias de Trabalho</span>
        <Calendar />
      </div>

      <div className="flex justify-end mr-[88px]">
        <Button as={Link} href="" color="primary" className="px-6 py-5 text-lg">
          Confirmar
        </Button>
      </div>
    </div>
  )
}
