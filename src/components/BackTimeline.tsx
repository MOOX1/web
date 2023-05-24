"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackTimeline() {
  const router = useRouter();

  const goBackTimeline = () => {
    router.back();
  };
  return (
    <div
      onClick={goBackTimeline}
      className="flex cursor-pointer items-center gap-1 py-5 text-sm text-gray-200 hover:text-gray-100"
    >
      <ChevronLeft className="h-4 w-4" />
      Voltar a timeline
    </div>
  );
}
