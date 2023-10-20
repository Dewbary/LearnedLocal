import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import sanityConfig from "@learnedlocal/sanity";
import type { CoverImageInfo } from "~/components/types";

export const client = createClient({
  projectId: "4gjyci47",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: true,
});

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source: CoverImageInfo) =>
  imageBuilder.image(source).auto("format").fit("max");
