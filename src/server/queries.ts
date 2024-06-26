import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

// this has to be wrapped with a try catch block
export async function getImages() {
  const user = auth();

  if (!user.userId) throw new Error("User not found");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("User not found");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");
  if (image.userId !== user.userId) throw new Error("Not authorized");

  return image;
}
