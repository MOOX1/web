import { api } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { MemoryDetails } from "../../../../models/memory";
import Image from "next/image";
import dayjs from "dayjs";
import EditMemory from "@/components/EditMemory";

interface MemoryDetailsProps {
  params: {
    id: string;
  };
}

export default async function MemoryDetails({ params }: MemoryDetailsProps) {
  const token = cookies().get("token")?.value;

  const memoryResponse = await api.get(`/memory/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory: MemoryDetails = memoryResponse.data;

  return (
    <div className="p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar a timeline
      </Link>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="my-2">
            {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
          </p>
        </div>
        <EditMemory memory={memory} />
        <Image
          src={memory.coverUrl}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>
      </div>
    </div>
  );
}
