import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

type Props = {
  value: ImageListType;
  onChange: (
    imageList: ImageListType
  ) => void;
  onChangeCoverImage: (
    imageList: ImageListType,
    coverIndex: number
  ) => void;
};

const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

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
        <div className="flex flex-col items-center mb-10">
          <button
            type="button"
            className="flex cursor-pointer flex-col items-center justify-center rounded border border-dashed border-gray-400 p-8 py-10 text-center w-full"
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
          <div className="flex flex-row flex-wrap justify-center">
            {imageList.map((image, index) => (
              <div key={index} className="image-item p-4">
                <div className="relative">
                  <img src={image.dataURL} className="h-56 w-72 object-cover" />
                  {(index === 0) && (
                    <div className="absolute top-2 left-2 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full px-3 py-1 text-white">
                      Cover Image
                    </div>
                  )}
                  <ul className="menu bg-gray-100 w-full absolute top-44 z-10">
                    <li>
                      <details>
                        <summary>Options</summary>
                        <ul>
                          <li>
                            <button type="button" onClick={() => onImageUpdate(index)}>
                              Update
                            </button>
                          </li>
                          <li>
                            <button type="button" onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </li>
                          <li>
                            <button type="button" onClick={() => onChangeCoverImage(imageList, index)}>
                              Make Cover Image
                            </button>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </div>
                
              </div>
            ))}
          </div>
          <button
            type="button"
            className="bg-red-400 hover:bg-red-300 btn-sm btn mt-5 text-white"
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
