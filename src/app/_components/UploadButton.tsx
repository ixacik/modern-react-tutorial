"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files: ", result);
  };

  return {
    InputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function UploadButton() {
  const [uploading, setUploading] = useState(false);

  const router = useRouter();
  const { InputProps } = useUploadThingProps("imageUploader", {
    onUploadBegin: () => setUploading(true),
    onClientUploadComplete: () => {
      router.refresh();
      setUploading(false);
    },
    onUploadError: () => {
      toast.error("Upload failed");
      setUploading(false);
    },
  });

  return (
    <>
      <Button asChild className="cursor-pointer" disabled={uploading}>
        {uploading ? (
          <div>
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Uploading...</span>
          </div>
        ) : (
          <label htmlFor="upload-button">Upload</label>
        )}
      </Button>
      <input
        type="file"
        id="upload-button"
        {...InputProps}
        className="sr-only"
      />
    </>
  );
}
