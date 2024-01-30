import * as React from "react";
import * as cx from "classnames";

import styles from "./Photos.module.css";
import { FormLabel } from "../../Form/FormLabel";
import { Field, FieldProps } from "formik";
import ImgUploader from "../../ImgUploader";
import { ImageListType, ImageType } from "react-images-uploading";

type PhotosProps = {};
const Photos = ({}: PhotosProps) => {
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
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <FormLabel
          text="Upload up to 5 images of your experience"
          className="text-center"
        />
        <Field name="photos">
          {({ field, form }: FieldProps<ImageListType>) => (
            <ImgUploader
              {...field}
              onChange={(imgList) => handleChange(imgList, form)}
              onChangeCoverImage={(
                imgList: ImageListType,
                coverIndex: number
              ) => setCoverImage(imgList, form, coverIndex)}
            />
          )}
        </Field>
      </div>

      <br />
    </div>
  );
};

export default Photos;
