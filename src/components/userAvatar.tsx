import React from "react";
import { User } from "next-auth";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

type UserAvatarProps = {
  user: User;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            src={user.image}
            fill
            alt="user profile"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
}
