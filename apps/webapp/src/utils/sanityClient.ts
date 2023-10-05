import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import sanityConfig from "../../../../packages/sanity/sanity.config";
import { CoverImageInfo } from "~/components/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source: CoverImageInfo) =>
  imageBuilder.image(source).auto("format").fit("max");
