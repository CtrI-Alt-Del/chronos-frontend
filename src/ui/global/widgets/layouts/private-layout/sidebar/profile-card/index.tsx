import { Avatar } from "@heroui/avatar";
import Link from "next/link";

import { useProfileCard } from "./use-profile-card";
import { ROUTES } from "@/constants/routes";

export const ProfileCard = () => {
  const { profile } = useProfileCard();

  if (profile?.id)
  return (
    <Link
      href={ROUTES.collaboration.profile(profile?.id)}
      className="flex justify-start items-center py-3 px-4 mb-4 w-52 border border-blue-300 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:translate-y-[-2px] group"
    >
      <Avatar
        color="primary"
        isBordered
        className="flex-shrink-0 h-6 transition-transform duration-300 min-w-6 group-hover:scale-110"
        radius="sm"
      />
      <p className="ml-3 font-normal text-gray-700 truncate transition-all duration-300 text-md group-hover:ml-4 group-hover:font-medium">
        {profile?.name}
      </p>
    </Link>
  );
};
