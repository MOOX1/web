import { getUser } from "@/lib/auth";
import Image from "next/image";

export default function Profile() {
  const { name, avatarUrl } = getUser();
  return (
    <div className="flex items-center gap-3 text-left">
      <div className="flex h-10  w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          src={avatarUrl}
          width={40}
          height={40}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className="text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          {" "}
          Logout{" "}
        </a>
      </p>
    </div>
  );
}
