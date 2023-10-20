import React from "react";
import { FormLabel } from "../Form/FormLabel";
import FormPageHeader from "../Typography/Typography";
import { ImageListType, ImageType } from "react-images-uploading";
import { Field, FieldProps } from "formik";
import ImgUploader from "../ImgUploader";

const PhotosPage = () => {
  const handleChange = (
    imageList: ImageListType,
    form: FieldProps<ImageListType>["form"]
  ) => {
    form.setFieldValue("photos", imageList);
  };

  const setCoverImage = (
    imageList: ImageListType,
    form: FieldProps<ImageListType>["form"],
    indexOfNewCover: number
  ) => {
    const imageToCover = imageList.at(indexOfNewCover) || {} as ImageType;
    const newImageList = imageList.filter((image, index) => index !== indexOfNewCover);
    newImageList.unshift(imageToCover);
    form.setFieldValue("photos", newImageList);
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col px-4">
      <FormPageHeader
        step={6}
        title="Add some photos for your guests"
        subtitle="Adding photos to your experience will help people understand what to expect."
      />

      <br />

      <div className="rounded-lg bg-white p-8 shadow-md">
        <FormLabel text="Upload up to 5 images of your experience" className="text-center"/>
          <Field name="photos">
            {({ field, form }: FieldProps<ImageListType>) => (
              <ImgUploader
                {...field}
                onChange={(imgList) => handleChange(imgList, form)}
                onChangeCoverImage={(imgList: ImageListType, coverIndex: number) => setCoverImage(imgList, form, coverIndex)}
              />
            )}
          </Field>
      </div>
      
      <br />
    </div>
  );
};

export default PhotosPage;
