import { FieldProps } from "formik";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

type Props = {
  value: ImageListType;
  form: FieldProps<ImageListType>["form"]; // Add form to the Props

  onChange: (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
    form: FieldProps<ImageListType>["form"]
  ) => void;
};

const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

const ImgUploader = ({ value, form, onChange }: Props) => {
  return (
    <ImageUploading
      multiple
      value={value}
      onChange={(imageList, addUpdateIndex) =>
        onChange(imageList, addUpdateIndex, form)
      }
      maxNumber={5}
      maxFileSize={maxFileSize}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => (
        <div className="upload__image-wrapper">
          <button
            type="button"
            className="flex cursor-pointer flex-col items-center justify-center rounded border border-dashed border-white p-8 py-10 text-center"
            {...dragProps}
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
          >
            <svg
              className="text-current-50 mr-1 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Click or Drop here
          </button>
          {errors && (
            <div>
              {errors.maxFileSize && (
                <span>Selected file size is larger than 10MB.</span>
              )}
            </div>
          )}
          &nbsp;
          <div className="flex flex-row flex-wrap">
            {imageList.map((image, index) => (
              <div key={index} className="image-item p-4">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button
                    type="button"
                    className="btn-secondary btn-xs btn"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn-secondary btn-xs btn"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn-primary btn-sm btn"
            onClick={onImageRemoveAll}
          >
            Remove all images
          </button>
        </div>
      )}
    </ImageUploading>
  );
};

export default ImgUploader;
