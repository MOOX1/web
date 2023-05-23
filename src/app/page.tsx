import EmptyMemories from "@/components/EmptyMemories";
import { cookies } from "next/headers";
import Dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Memory } from "../../models/memory";

Dayjs.locale(ptBr);

export default async function Home() {
  const isAuthenticated = cookies().has("token");
  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get("token")?.value;

  const response = await fetch("http://localhost:3333/memories", {
    next: {
      revalidate: 0,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());

  const memories: Memory[] = response;

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((item) => (
        <div key={item.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50 ">
            {Dayjs(item.createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </time>
          <Image
            src={item.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {item.excerpt}
          </p>
          <Link
            href={`/memories/${item.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            {" "}
            Ler Mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
