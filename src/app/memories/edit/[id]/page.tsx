import BackTimeline from "@/components/BackTimeline";
import { MemoryDetails } from "../../../../../models/memory";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import EditMemoryForm from "@/components/EditMemoryForm";
import { ChangeEvent, useState } from "react";

interface EditMemory {
  params: {
    id: string;
  };
}

export default async function EditMemory({ params }: EditMemory) {
  const token = cookies().get("token")?.value;

  const memoryResponse = await api.get(`/memory/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memory: MemoryDetails = memoryResponse.data;

  return (
    <div className="p-16">
      <BackTimeline />
      <EditMemoryForm memory={memory} />
    </div>
  );
}
