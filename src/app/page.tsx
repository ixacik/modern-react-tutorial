import Image from "next/image";
import { getImages } from "@/server/queries";
import Link from "next/link";
import { Suspense } from "react";
import { UploadButton } from "./_components/UploadButton";
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div>
      <div className="bg-card flex w-full justify-center p-4">
        <UploadButton />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <Suspense fallback={<ImageDisplayLoading />}>
          <ImageDisplay />
        </Suspense>
      </div>
    </div>
  );
}

function ImageDisplayLoading() {
  return (
    <>
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
      <div className="h-64 animate-pulse rounded-lg bg-gray-800" />
    </>
  );
}

async function ImageDisplay() {
  const images = await getImages();

  return images?.map((image) => (
    <Link
      href={`/img/${image.id}`}
      key={image.id}
      className="bg-card border-border overflow-hidden rounded-lg border p-4"
    >
      <div className="relative h-[200px] w-full">
        <Image src={image.url} alt={image.name} fill className="object-cover" />
      </div>
      <div className="pt-2">{image.name}</div>
    </Link>
  ));
}
