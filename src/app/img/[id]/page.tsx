import { getImage } from "@/server/queries";
import { formatDate } from "@/utils/formatters";
import Image from "next/image";

export default async function ImagePage({
  params: { id },
}: {
  params: { id: number };
}) {
  const image = await getImage(id);

  return (
    <div className="flex h-[calc(100vh-5rem)] w-full">
      <div className="relative h-full w-full">
        <Image
          src={image.url}
          alt={image.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="w-80  p-4 text-white">
        <div className="text-2xl font-bold">{image.name}</div>
        <p>{formatDate(image.createdAt)}</p>
      </div>
    </div>
  );
}
