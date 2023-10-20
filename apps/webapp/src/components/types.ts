import type {
  Experience,
  ExperienceAvailability,
  Profile,
} from "@learnedlocal/db";
import type {
  SanityReference,
  SanityKeyedReference,
  SanityBlock,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
} from "sanity-codegen";

export type DateInfo = {
  id?: number;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};

type ReplaceDateWithString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

export type SerializedExperienceInfo = SerializedExperience & {
  profile: Profile | null;
  availability: SerializedExperienceAvailability[];
};

type SerializedExperience = ReplaceDateWithString<Experience>;
type SerializedExperienceAvailability =
  ReplaceDateWithString<ExperienceAvailability>;

export interface PostInfo {
  title?: string;
  slug?: { current: string };
  content?: BlockContent;
  excerpt?: string;
  coverImage?: CoverImageInfo;
  author?: Author;
  categories?: Array<SanityKeyedReference<Category>>;
  publishedAt?: string;
}

export interface CoverImageInfo {
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
}

export interface Author {
  name?: string;
  slug?: { current: string };
  image?: {
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
  bio?: Array<SanityKeyed<SanityBlock>>;
}

export interface Category {
  title?: string;
  description?: string;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "string";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type Documents = PostInfo | Author | Category;
