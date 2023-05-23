"use client";

import { Edit3, Trash2 } from "lucide-react";
import { MemoryDetails } from "../../models/memory";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface EditMemoryProps {
  memory: MemoryDetails;
}

export default function EditMemory({ memory }: EditMemoryProps) {
  const [confirmVisibly, setConfirmVisibly] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookie.get("token");

  const DeleteMemory = () => {
    const response = api.delete(`/memories/${memory.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/");
    router.refresh();
    console.log(response, "delete");
  };

  return (
    <>
      <div className="flex justify-end gap-4 leading-relaxed">
        <Link href={`/memories/edit/${memory.id}`}>
          <Edit3 className="h-5 w-5 cursor-pointer transition-colors" />
        </Link>
        <Trash2
          onClick={() => setConfirmVisibly(!confirmVisibly)}
          className="h-5 w-5 cursor-pointer text-red-300 transition-colors hover:text-red-100"
        />
      </div>
      {confirmVisibly && (
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-nowrap justify-center gap-4 rounded bg-gray-300/10 p-5">
            <p className=" font-alt"> Tem certeza do que está fazendo ?</p>
            <p
              onClick={DeleteMemory}
              className="cursor-pointer text-blue-500 hover:text-blue-900"
            >
              {" "}
              confirmar{" "}
            </p>
            <p
              onClick={() => setConfirmVisibly(false)}
              className="cursor-pointer text-red-500 hover:text-red-900"
            >
              {" "}
              cancelar{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
