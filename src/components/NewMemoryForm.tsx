"use client";

import { Camera } from "lucide-react";
import MediaPicker from "./MediaPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function NewMemoryForm() {
  const router = useRouter();

  const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadReponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadReponse.data.fileUrl;
    }

    const token = Cookie.get("token");

    await api.post(
      "/memory",
      {
        coverUrl,
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    router.push("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleCreateMemory}
      action=""
      className="flex flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar midia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Torna a memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-gray-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
}
