import React from "react";
import { FormLabel } from "./Form/FormLabel";
import FormPageHeader from "./Typography/Typography";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Field, FieldProps } from "formik";
import ImgUploader from "./ImgUploader";

type Props = {
  images: ImageListType;
  onSetImages: (imageList: ImageListType) => void;
};

const PhotosPage = ({ images, onSetImages }: Props) => {
  const handleChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
    form: FieldProps<ImageListType>["form"]
  ) => {
    // data for submit
    console.log(imageList);
    // onSetImages(imageList);
    form.setFieldValue("photos", imageList);
  };

  return (
    <div className="container mx-auto overflow-y-auto py-12 px-4 sm:px-6 lg:px-8">
      <FormPageHeader
        step={7}
        title="Show off your experience"
        subtitle="Trust us, people want to know what you can do"
      />

      <FormLabel text="Upload up to 5 images of your experience" />
      <Field name="photos">
        {({ field, form }: FieldProps<ImageListType>) => (
          <ImgUploader
            {...field}
            form={form}
            onChange={(imgList) => handleChange(imgList, undefined, form)}
          />
        )}
      </Field>

      {/* <FormLabel text="Select the main image to be displayed" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(handleImageSelected)}
        className="file-input-bordered file-input-primary file-input w-full max-w-xs"
      /> */}
    </div>
  );
};

export default PhotosPage;
