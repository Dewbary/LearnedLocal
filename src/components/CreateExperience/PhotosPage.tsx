import React from "react";
import { FormLabel } from "./Form/FormLabel";
import FormPageHeader from "./Typography/Typography";
import { ImageListType } from "react-images-uploading";
import { Field, FieldProps } from "formik";
import ImgUploader from "./ImgUploader";

const PhotosPage = () => {
  const handleChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
    form: FieldProps<ImageListType>["form"]
  ) => {
    form.setFieldValue("photos", imageList);
  };

  return (
    <div className="mx-auto max-w-4xl py-10 px-4">
      <FormPageHeader
        step={7}
        title="Show off your experience"
        subtitle="Trust us, people want to know what you can do"
      />

      <br />

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
      <br />
    </div>
  );
};

export default PhotosPage;
