"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <div className="absolute left-4 top-4 z-50 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-white/20">
      <X onClick={() => router.back()} className="h-4 w-4" />
    </div>
  );
}
