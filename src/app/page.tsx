import { db } from "@/server/db";
import Image from "next/image";
import ImageUploader from "./_components/ImageUploader";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  return (
    <div>
      <div className="bg-card p-4">
        <ImageUploader />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-card border-border overflow-hidden rounded-lg border p-4"
          >
            <div className="relative h-[200px] w-full">
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="pt-2">{image.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
