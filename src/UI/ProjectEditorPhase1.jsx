import React, { useState, useEffect, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import { GrFormNextLink } from "react-icons/gr";
import Compressor from 'compressorjs';

function ProjectEditorPhase1({
  isLoading,
  data,
  setData,
  setPhase,
  isEditingSession
}) {
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
const [isCompressingImages, setIsCompressingImages] = useState(false);
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,

    reset,
    formState: { errors },
    
  } = useForm({});

  useEffect(() => {
    if (data) {
      setValue("summary", data?.summary)
      setValue("description", data?.description)
      setValue("images", data?.images)
      setValue("thumbnail", data?.thumbnail)
      setImages(data?.images || []);
      setThumbnail(data?.thumbnail || null)
    }
  }, [data, reset]);

  function selectFiles(e) {
    const files = e.target.files;
    validateFiles(e, files);
  }
  function onDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  const removeImages = (image) => {
    const updatedImages = images.filter((img) => isEditingSession ? image !== img : img.name !== image.name);
    setImages(updatedImages);

    if (updatedImages.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
      setValue("images", []); 
    } else {
      setValue("images", updatedImages); 
    }
  };


  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.7,  

        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  };
  



  const validateFiles = async (e, files) => {
    let isImages = e.target.closest(".images") || e.target.closest("#images");
    let isThumbnail =
      e.target.closest(".thumbnail") || e.target.closest("#thumbnail");
  
    if (files.length === 0) return;
    if (files.length > 10) {
      toast.error("You can only upload up to 10 images per project");
      return;
    }
  
    const validImages = [];
    for (const file of files) {
      if (!file.type.startsWith("image")) {
        toast.error("Invalid file type, please select only jpg, jpeg, png, webp");
        return;
      }
  

      if (file.size > 4000000) { 
       toast.error("file size too large to compress")
       return;
    }


      let imageFile = file;
  
      if (file.size > 1000000) {  // 1MB for compression
        try {
          setIsCompressingImages(true);
          imageFile = await compressImage(file);
          toast.success("Image was compressed to fit size requirements.");
        } catch (error) {
          console.error("Error compressing the image:", error.message);
          toast.error(`Error compressing the image: ${error.message}`);
          return;
        }
      }
  
      if (isThumbnail) {
        setThumbnail({
          name: imageFile.name,
          url: URL.createObjectURL(imageFile),
          image: imageFile,
        });
      }
  
      if (isImages) {
        if (images.find((image) => image.name === imageFile.name)) continue;
  
        validImages.push({
          name: imageFile.name,
          url: URL.createObjectURL(imageFile),
          image: imageFile,
        });
      }
    }
  
    // If images were added, update the state and react-hook-form values
    if (isImages && validImages.length > 0) {
      const updatedImages = [...images, ...validImages];
      setIsCompressingImages(false);
      setImages(updatedImages);
  
      // Update react-hook-form's value and clear errors
      setValue("images", updatedImages);
      clearErrors("images");
    }
  };



  // const validateFiles = (e, files) => {
  //   let isImages = e.target.closest(".images") || e.target.closest("#images");
  //   let isThumbnail =
  //     e.target.closest(".thumbnail") || e.target.closest("#thumbnail");

  //   if (files.length === 0) return;
  //   if (files.length > 10) {
  //     toast.error("You can only upload up to 10 images per project");
  //     return;
  //   }

  //   const validImages = [];
  //   for (const file of files) {
  //     if (!file.type.startsWith("image")) {
  //       toast.error(
  //         "Invalid file type, please select only jpg, jpeg, png, webp"
  //       );
  //       return;
  //     }

  //     if (file.size > 2000000) {
  //       toast.error("File is too large, please select a file less than 2MB");
  //       return;
  //     }

  //     if (isThumbnail) {
  //       setThumbnail({
  //         name: file.name,
  //         url: URL.createObjectURL(file),
  //         image: file,
  //       });
  //     }

  //     if (isImages) {
  //       if (images.find((image) => image.name === file.name)) continue;

    

  //       validImages.push({
  //         name: file.name,
  //         url: URL.createObjectURL(file),
  //         image: file,
  //       });
  //     }
  //   }

  //   // If images were added, update the state and react-hook-form values
  //   if (isImages && validImages.length > 0) {
  //     const updatedImages = [...images, ...validImages];
  //     setImages(updatedImages);

  //     // Update react-hook-form's value and clear errors
  //     setValue("images", updatedImages);
  //     clearErrors("images");
  //   }
  // };

  //   const validateFiles = (e, files) => {
  //     let isImages = e.target.closest(".images") || e.target.closest("#images");
  //     let isThumbnail =
  //       e.target.closest(".thumbnail") || e.target.closest("#thumbnail");

  //     if (files.length === 0) return;
  //     if (files.length > 10) {
  //       toast.error("You can only upload upto 10 images per project");
  //       return;
  //     }
  //     for (const file of files) {
  //       if (!file.type.startsWith("image/")) {
  //         toast.error(
  //           "invalid file type, please select only jpg, jpeg, png, webp"
  //         );
  //         return;
  //       }
  // // if the file is also large than 4 mb, we want to show a toast message and return
  //         if (file.size > 4000000) {
  //             toast.error("file is too large, please select a file less than 4mb");
  //             return;
  //         }

  //       if (isThumbnail) {
  //         setThumbnail({
  //           name: file.name,
  //           url: URL.createObjectURL(file),
  //           image: file,
  //         });
  //       }

  //       if (images.find((image) => image.name === file.name)) continue;
  //       if (isImages) {
  //         // if an image is too large we also want the isRenderingImage to be true so that we can show a loading spinner
  //         if (file.size > 100000) {
  //             setIsRenderingImage(true);
  //             setTimeout(() => {
  //                 setIsRenderingImage(false);
  //             }, 3000);
  //         }
  //         setImages((prevImages) => [
  //           ...prevImages,
  //           { name: file.name, url: URL.createObjectURL(file), image: file },
  //         ]);
  //       }
  //     }
  //        // Update react-hook-form's value and clear errors
  //        setValue("images", images);
  //        clearErrors("images");
  //   };

  function onDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    validateFiles(e, files);
  }

  function onSubmit(formData) {
    const updatedData = {...data, ...formData, thumbnail, images };
    setData(updatedData);
    setPhase(2);
  }
if(isLoading) return <Spinner/>
  return (
    <div className="h-full overflow-scroll text-[var(--color-primary)] pb-24 md:pb-16 text-lg font-medium">
      <div className="h-auto w-full mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          className="mx-auto w-3/4 flex flex-col gap-4 items-center justify-center"
        >
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className="text-[var(--color-dark)] w-3/4 thumbnail"
          >
            {/* a container for the thumbanil, required */}
            {thumbnail ? (
              <div className="relative">
                <img
                  src={thumbnail.url ? thumbnail.url : thumbnail}
                  alt={thumbnail.name}
                  className="w-full h-full"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0  text-[var(--bg-secondary)] bg-stone-100 rounded-full text-3xl  "
                  onClick={() => setThumbnail(null)}
                >
                  <MdCancel />
                </button>
              </div>
            ) : (
              <>
                <input
                  {...register("thumbnail", {
                    required: `thumbnail is required`,
                  })}
                  type="file"
                  className="hidden"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={selectFiles}
                />
                <div className="p-10 w-full aspect-video border border-[var(--bg-secondary)] flex items-center flex-col justify-center gap-4">
                  <div className="text-center flex items-center flex-col">
                    <FaRegImage className="text-5xl" />
                    <p>Thumbnail(Project Cover) (1280 &times; 720) pixels</p>
                  </div>
                  <div>
                    {isDragging ? (
                      <span>drop images here</span>
                    ) : (
                      <span className="text-stone-900">
                        drag and drop an image or
                      </span>
                    )}
                    &nbsp;
                    <label
                      htmlFor="thumbnail"
                      className=" cursor-pointer text-[var(--color-primary)]"
                    >
                      Browse
                    </label>
                  </div>
                </div>
                {errors["thumbnail"] && (
                  <p className="text-red-600 text-sm font-medium italic w-full text-left">
                    *{errors["thumbnail"].message}
                  </p>
                )}
              </>
            )}
          </div>

          <br />

          {/* for images */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className="border border-stone-900  py-20 w-full h-full flex justify-center text-stone-900"
          >
            <input
              {...register("images", {
                required: `atleast 1 image is required`,
              })}
              type="file"
              ref={fileInputRef} // Attach the ref here
              className="hidden"
              id="images"
              multiple
              onChange={selectFiles}
            />

            <div className="p-4 w-full flex items-center flex-col justify-center gap-4 images">
              {images?.length > 0 && (
                <div>
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url ? image.url : image}
                        alt={image.name ? image.name : "project image"}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0  text-[var(--bg-secondary)] bg-stone-100 rounded-full text-3xl  "
                        onClick={() => removeImages(image)}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {(images.length <= 10 && !isCompressingImages)  ? (
                <>
                  <div className="text-center flex items-center flex-col">
                    <FaRegImage className="text-9xl" />
                    <p>Project Images (1280 &times; 720) pixels</p>
                  </div>
                  <div>
                    {isDragging ? (
                      <span>drop images here</span>
                    ) : (
                      <span className="text-stone-900">
                        drag and drop images or
                      </span>
                    )}
                    &nbsp;
                    <label
                      htmlFor="images"
                      className="cursor-pointer text-[var(--color-primary)]"
                    >
                      Browse
                    </label>
                  </div>
                </>
              ) : <div>compressing images, please wait...</div>}
            </div>
          </div>
          { isEditingSession ? (errors["images"] && images?.length === 0) : errors["images"] && (
            <p className="text-red-600 text-sm font-medium italic w-full text-left">
              {errors["images"]?.message}
            </p>
          )}

          <div className="mt-20 w-full space-y-2">
            {errors["summary"] && (
              <p className="text-red-600 text-sm font-medium italic w-full text-left">
                *{errors["summary"].message}
              </p>
            )}
            <textarea
              {...register("summary", {
                required: `summary is required`,
              })}
              type="text"
              className="w-full resize-none   bg-[var(--bg-quaternary)] py-3 px-4 text-xl  rounded-md placeholder:text-[var(--color-primary)]"
              placeholder="Project Summary"
              rows={3}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Project Summary")}
              maxLength={300}
            />
            {errors["description"] && (
              <p className="text-red-600 text-sm font-medium italic w-full text-left">
                *{errors["description"].message}
              </p>
            )}
            <textarea
              {...register("description", {
                required: `description is required`,
              })}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Project Description")}
              maxLength={1000}
              rows={8}
              type="text"
              className="w-full resize-none bg-[var(--bg-quaternary)] py-2 px-4 text-lg font-normal  rounded-md placeholder:text-[var(--color-primary)]"
              placeholder="Project Description"
            />
          </div>
          <button
            type="submit"
            className=" ml-auto px-4 py-1 text-[var(--color-light)] right-0 flex items-center gap-1 bg-[var(--bg-btn-primary)]"
          >
            Next <GrFormNextLink className="mt-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProjectEditorPhase1;
