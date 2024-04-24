import Image from "next/image";
import Modal from "./Modal";
import { getImage } from "@/server/queries";
import { Suspense } from "react";
import CloseButton from "./_components/CloseButton";
import { formatDate } from "@/utils/formatters";

export default async function ModalImagePage({
  params: { id },
}: {
  params: { id: number };
}) {
  return (
    <Modal>
      <CloseButton />
      <Suspense
        fallback={
          <div className="flex h-full w-full gap-2 p-1">
            <div className="h-full w-full animate-pulse rounded-lg bg-gray-900" />
            <div className="bg-gray-0 h-full w-80 animate-pulse rounded-lg bg-gray-900" />
          </div>
        }
      >
        <Content id={id} />
      </Suspense>
    </Modal>
  );
}

async function Content({ id }: { id: number }) {
  const image = await getImage(id);

  return (
    <div className="flex h-full w-full">
      <div className="relative flex-1">
        <Image
          src={image.url}
          alt={image.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="h-screen w-80 border-zinc-800 bg-black p-4 text-white">
        <h1 className="text-2xl font-bold">{image.name}</h1>
        <p>{formatDate(image.createdAt)}</p>
      </div>
    </div>
  );
}
