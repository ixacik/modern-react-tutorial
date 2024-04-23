"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function ImageUploader() {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={() => router.refresh()}
    />
  );
}
