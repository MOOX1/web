"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
interface MediaPickerProps {
  previewEdit?: string;
}

export default function MediaPicker({ previewEdit }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const onFilelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files || !files.length) return setPreview(null);

    const previewUrl = URL.createObjectURL(files[0]);
    setPreview(previewUrl);
  };

  return (
    <>
      <input
        onChange={onFilelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        <img
          width={40}
          height={40}
          src={preview ? preview : previewEdit}
          alt="preview image"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
      {previewEdit && preview == null && (
        <Image
          src={previewEdit}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
}
