import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";

type Props = {
  value: ImageListType;
  onChange: (imageList: ImageListType) => void;
  onChangeCoverImage: (imageList: ImageListType, coverIndex: number) => void;
};

const maxFileSize = 10 * 1024 * 1024;

const ImgUploader = ({ value, onChange, onChangeCoverImage }: Props) => {
  return (
    <ImageUploading
      multiple
      value={value}
      onChange={(imageList) => onChange(imageList)}
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
        <div className="mb-10 flex flex-col items-center">
          <button
            type="button"
            className="min-h-72 flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-400 p-8 py-10 text-center"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
          <div className="flex flex-row flex-wrap justify-center">
            {imageList.map((image, index) => (
              <div key={index} className="image-item p-4">
                <div className="relative">
                  <img
                    src={image.dataURL}
                    className="h-56 w-72 object-cover"
                    alt=""
                  />
                  {index === 0 && (
                    <div className="absolute left-2 top-2 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 px-3 py-1 text-white">
                      Cover Image
                    </div>
                  )}
                  <ImageOptionsMenu
                    onImageUpdate={() => onImageUpdate(index)}
                    onImageRemove={() => onImageRemove(index)}
                    onChangeCoverImage={() =>
                      onChangeCoverImage(imageList, index)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-sm mt-5 bg-red-400 text-white hover:bg-red-300"
            onClick={onImageRemoveAll}
          >
            Remove all images
          </button>
        </div>
      )}
    </ImageUploading>
  );
};

const ImageOptionsMenu = function ({
  onImageUpdate,
  onImageRemove,
  onChangeCoverImage,
}: {
  onImageUpdate: () => void;
  onImageRemove: () => void;
  onChangeCoverImage: () => void;
}) {
  const closeMenus = () => {
    const imageMenus = document.querySelectorAll(".imageMenu");
    imageMenus.forEach((imageMenu) => {
      if (
        imageMenu instanceof HTMLDetailsElement &&
        imageMenu.hasAttribute("open")
      ) {
        imageMenu.removeAttribute("open");
      }
    });
  };

  return (
    <details className="imageMenu absolute top-44 z-10 w-full bg-gray-100">
      <summary className="w-full p-3 hover:cursor-pointer">Options</summary>
      <div className="dropdown-content flex w-full flex-col items-start bg-gray-100 p-3 pt-0">
        <div
          className="w-full p-3 hover:cursor-pointer hover:bg-gray-200"
          onClick={() => onImageUpdate()}
        >
          Update
        </div>
        <div
          className="w-full p-3 hover:cursor-pointer hover:bg-gray-200"
          onClick={() => onImageRemove()}
        >
          Remove
        </div>
        <div
          className="w-full p-3 hover:cursor-pointer hover:bg-gray-200"
          onClick={() => {
            onChangeCoverImage();
            closeMenus();
          }}
        >
          Make Cover Image
        </div>
      </div>
    </details>
  );
};

export default ImgUploader;
