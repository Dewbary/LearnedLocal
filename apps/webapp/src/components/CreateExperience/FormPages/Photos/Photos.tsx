import * as React from "react";
import { Field, FieldProps } from "formik";
import ImgUploader from "../../ImgUploader";
import type { ImageListType, ImageType } from "react-images-uploading";
import FieldLabel from "~/components/common/Fields/FieldLabel";

const Photos = () => {
  const handleChange = async (
    imageList: ImageListType,
    form: FieldProps<ImageListType>["form"]
  ) => {
    await form.setFieldValue("photos", imageList);
  };

  const setCoverImage = async (
    imageList: ImageListType,
    form: FieldProps<ImageListType>["form"],
    indexOfNewCover: number
  ) => {
    const imageToCover = imageList.at(indexOfNewCover) || ({} as ImageType);
    const newImageList = imageList.filter(
      (image, index) => index !== indexOfNewCover
    );
    newImageList.unshift(imageToCover);
    await form.setFieldValue("photos", newImageList);
  };

  return (
    <>
      <div className="mb-2">
        <FieldLabel displayName="Upload up to 5 images showcasing your experience" />
      </div>
      <Field name="photos">
        {({ field, form }: FieldProps<ImageListType>) => (
          <ImgUploader
            {...field}
            onChange={(imgList) => handleChange(imgList, form)}
            onChangeCoverImage={(imgList: ImageListType, coverIndex: number) =>
              setCoverImage(imgList, form, coverIndex)
            }
          />
        )}
      </Field>
    </>
  );
};

export default Photos;
