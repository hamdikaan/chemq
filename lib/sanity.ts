import { createClient } from "next-sanity";
import createImageBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET || "production",
  apiVersion: "2022-10-01",
  useCdn: true,
});

export function urlFor(source: SanityImageSource) {
  return createImageBuilder(client).image(source);
}
