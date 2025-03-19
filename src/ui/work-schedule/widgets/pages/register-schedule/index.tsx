import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

import { CreateWorkSchedule } from "./create-work-schedule";
import { Search } from "lucide-react";

export const RegisterSchedulePage = () => {
  return (
    <div className="p-6 rounded-lg border border-gray-border">
      <div className="flex flex-col py-4 pr-20 pl-10">
        <CreateWorkSchedule />
      </div>

      <div className="flex justify-end pr-20 mr-12">
        <Button as={Link} href="" color="primary" className="px-6 py-5 text-lg">
          Confirmar
        </Button>
      </div>
    </div>
  );
};
