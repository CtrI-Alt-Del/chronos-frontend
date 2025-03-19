import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import Link from "next/link"

import { WorkScheduleCard } from "./work-schedule-card"

export const SchedulePage = () => {
  return (
    <div>
      <div className="text-3xl font-extrabold text-black p-10">
        <h1 className="">Escalas</h1>
      </div>

      <div className="flex px-10 py-2 justify-between">
        <div className="flex w-[280px]">
          <Input
            label={<span className="text-blue-500 font-bold text-lg">Nome da Escala</span>}
            placeholder="Buscar horários..."
            variant="underlined"
            color="primary"
            labelPlacement="outside"
            className="pl-2 text-xl input-label"
          />
        </div>

        <div className="flex pr-8">
          <Button as={Link} href="" color="primary" className="px-6 py-5">Registrar Escala</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 pr-16 mt-10 place-items-center">
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
        <WorkScheduleCard />
      </div>
    </div>
  )
}
