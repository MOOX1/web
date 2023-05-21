"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  const onFilelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

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
          src={preview}
          alt="preview image"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  );
}
