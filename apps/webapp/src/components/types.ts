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

export type Filter = DistanceFilter | CategoryFilter | DateFilter;

export type DistanceFilter = {
  name: DistanceFilterType;
};

export type CategoryFilter = {
  name: CategoryName;
};

export type DateFilter = {
  name: DateFilterType;
};

export type DateFilterType =
  | "Any Day"
  | "Today"
  | "Tomorrow"
  | "This Week"
  | "Next Week"
  | "Past";

export type CategoryName =
  | "Any Category"
  | "Arts & Crafts"
  | "Food"
  | "Health & Wellness"
  | "Outdoors"
  | "Technology"
  | "Handy"
  | "Music"
  | "Photography"
  | "Family"
  | "Entertainment"
  | "Other";

export type DistanceFilterType =
  | "Any Distance"
  | "5 miles"
  | "10 miles"
  | "25 miles"
  | "50 miles"
  | "100 miles";
