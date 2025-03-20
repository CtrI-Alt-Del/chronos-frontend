import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

import { WorkScheduleCard } from "./work-schedule-card";

export const SchedulePage = () => {
  return (
    <div className="p-6 rounded-lg border border-gray-border">
      <div className="flex justify-between px-10 py-2">
        <div className="flex w-[280px]">
          <Input
            label={
              <span className="text-lg font-bold text-blue-500">
                Nome da Escala
              </span>
            }
            placeholder="Buscar horários..."
            variant="underlined"
            color="primary"
            labelPlacement="outside"
            className="pl-2 text-xl input-label"
          />
        </div>

        <div className="flex pr-8">
          <Button as={Link} href="" color="primary" className="px-6 py-5">
            Registrar Escala
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 place-items-center px-10 pr-16 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
  );
};
