import { WorkScheduleDto } from "@/@core/work-schedule/dtos";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";
interface WorkScheduleCardProps {
  schedule: WorkScheduleDto
}

export const WorkScheduleCard = ({ schedule }: WorkScheduleCardProps) => {
  return (
    <Link href="" className="focus:outline-none">
      <Card className="max-w-60 w-48 border hover:bg-gray-100 transition-all cursor-pointer" shadow="none">
        <CardHeader className="flex gap-3">
          <Image
            alt="heroui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md font-bold">{schedule.description}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
