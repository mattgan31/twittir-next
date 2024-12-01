import React from "react";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/20/solid";

interface ProfileInterface {
  navbarVisible: boolean;
  profile: {
    profile_picture: string;
    fullname: string;
    username: string;
  };
}

export default function ProfileCard({
  navbarVisible,
  profile,
}: ProfileInterface) {
  return (
    <div
      className={`p-2 rounded-lg border border-slate-300 w-full ${navbarVisible ? "block" : "hidden"
        }`}
    >
      <div className="flex items-center hover:cursor-pointer">
        {profile && profile.profile_picture ? (
          <Image src={profile.profile_picture} sizes="12" alt={""} />
        ) : (
          <UserCircleIcon className={`h-12 w-12 fill-gray-400`} />
        )}
        <div className="flex flex-col">
          <p className="ml-2 text-gray-600 dark:text-gray-100 font-bold">
            {profile ? profile.fullname : ""}
          </p>
          <p className="ml-2 text-gray-500 dark:text-gray-100 font-light text-sm">
            @{profile ? profile.username : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
