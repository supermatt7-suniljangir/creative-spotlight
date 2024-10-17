import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import useCreateProject from "../features/projects/useCreateProject";
import Spinner from "./Spinner";
import { FaRegCheckCircle } from "react-icons/fa";
import ShareMenu from "./ShareMenu";
import Button from "./Button";
import { Link } from "react-router-dom";
import useEditProject from "../features/projects/useEditProject";

function ProjectEditorPhase2({ data, setData, setPhase, userId,isEditingSession }) {

  function generateUniqueId() {
    const randomLength = Math.floor(Math.random() * 4) + 4; // Length between 4 and 7
    const uniqueId = Math.floor(Date.now() * Math.random() * Math.random() * 1000000);
    return uniqueId.toString().slice(-randomLength);
  }

  
  
  const [tags, setTags] = useState(data?.tags || []);
  const [title, setTitle] = useState( data?.title || "");
  const [category, setCategory] = useState(data?.category || []);
  let [projectId, setProjectId] = useState( data?.projectId || null);
  const [tag, setTag] = useState("");
  const regex = /^[a-zA-Z0-9. ]+$/;
  const {
    createProject,
    error: uploadError,
    isPending:isPendingUploading,
    isSuccess:isSuccessUploading,
  } = useCreateProject();
  const {
    updateProject,
    error: updatingError,
    isPending:isPendingUpdating,
    isSuccess:isSuccessUpdating,
  } = useEditProject();





  const validUrl =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  const [link, setLink] = useState(isEditingSession ? data?.link : "");
  const categories = [
    "UI/UX",
    "Web Design",
    "Branding",
    "Illustration",
    "Graphic Design",
    "Product Design",
    "Fashion",
    "Icon Design",
    "Photography",
    "Logo/Banner",

  ];
  const suggestedTags = [
    "User Interface",
    "Figma Design",
    "Photography",
    "Icon Design",
    "Illustration",
    "Logo Design",
    "Branding",
    "Product Design",
    "Fashion",
  ];
  function handleAddTag(tag) {
    if (tags.includes(tag)) {
      toast.error("Tag already added");
      return;
    }
    if (tags.length >= 10) {
      toast.error("You can't add more than 10 tags");
      return;
    }
    if (!regex.test(tag)) {
      toast.error("Only letters and numbers are allowed");
      return;
    }

    if (tag) {
      setTags([...tags, tag]);
      setTag("");
    }
  }

  function handleSuggestedTags(suggestedTag) {
    // we don't wanna add the same tag twice and also we don't want to add more than 10 tags and remove the tag from the suggested tags once its added to the tags but also add it back if the tag is removed from the tags
    if (tags.length >= 10) {
      toast.error("You can't add more than 10 tags");
      return;
    }
    if (tags.includes(suggestedTag)) {
      toast.error("Tag already added");
      return;
    }

    setTags([...tags, suggestedTag]);
  }

  function removeTag(index) {
    setTags(tags.filter((tag, i) => i !== index));
  }




  function publishProject() {

    if (
      !title ||
      title.length < 5 ||
      !regex.test(title) ||
      tags.length < 3 ||
      !category ||
      (link && !validUrl.test(link))
    ) {
      toast.error("Please fill in all fields properly");
      return;
    }
    const projectId = isEditingSession ? data?.projectId : generateUniqueId();
 setProjectId(projectId);
    const projectData = {
      images:data?.images,
      thumbnail:data?.thumbnail,
      summary:data?.summary,
      description:data?.description,
      title,
      likes:data?.likes,
      tags,
      link,
      category,
      userId,
      projectId
    };
    setData(projectData);

    isEditingSession ? updateProject({projectData}) :  createProject({ projectData });
  }

  return (
    // overlay
    <div className="w-full h-full p-6">
      <div className="absolute  w-screen h-screen z-50 top-0 left-0 bg-black opacity-90"></div>

      <div className="bg-[var(--bg-primary)] z-[100] w-full h-full absolute md:h-[90%] left-1/2 top-1/2 md:w-[85%]  -translate-y-1/2 -translate-x-1/2 overflow-scroll ">
        <div className="w-full h-full flex md:flex-row flex-col-reverse">
          {/* the first child, left container */}
          <div className="md:w-2/4 w-full mt-4 text-[var(--bg-dark)] h-full overflow-auto p-4">
            <input
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Name your project")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              maxLength={50}
              minLength={5}
              className="w-full bg-transparent border-b focus:border-b-2 border-[var(--bg-secondary)] py-3  text-xl font-medium text-[var(--color-primary)]  rounded-sm placeholder:text-[var(--color-primary)]"
              placeholder="Name your project"
            />
            {(!title || title.length < 5 || !regex.test(title)) && (
              <p className="text-red-500 text-sm mt-2">
                *Please add valid a title (only alphanumeric characters)
              </p>
            )}

            {/* tags */}
            <div className="border-b border-[var(--bg-secondary)] flex flex-wrap items-center w-full  rounded-sm mt-10">
              <h2 className="text-lg text-[var(--color-primary)] font-medium w-full">
                Add tags to your project
              </h2>
              {/* Tags */}
              <div className="flex flex-wrap py-2 items-center  text-[var(--color-light)]  w-fit gap-2 ">
                {tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="h-fit px-2 py-1 box-border bg-[var(--bg-secondary)] rounded-sm flex items-center gap-2 "
                  >
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(index)}>
                      <MdCancel className="text-xl mt-0.5" />
                    </button>
                  </div>
                ))}

                <input
                  type="text"
                  placeholder="Add a Tag"
                  className="border border-[var(--bg-secondary)] text-[var(--color-primary)] font-medium bg-transparent p-1.5 "
                  maxLength={20}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag(tag)}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Add a Tag")}
                />
              </div>

              <div className=" py-2">
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  Suggested Tags:{" "}
                  {suggestedTags.map((tag) => (
                    <span
                      key={tag}
                      className={` p-1 rounded-sm border border-[var(--bg-secondary)] ${
                        tags.includes(tag)
                          ? "bg-stone-300 cursor-not-allowed"
                          : "bg-[var(--bg-primary)] cursor-pointer"
                      }`}
                      onClick={() => handleSuggestedTags(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            {tags?.length < 3 && (
              <p className="text-red-500 text-sm mt-2">
                *Please add at least 3 tags
              </p>
            )}

            {/* category */}
            <div className="w-full mt-12 border-b border-[var(--bg-secondary)] pb-4 ">
              <h2 className="text-lg text-[var(--color-primary)] font-medium my-2">
                Categorize your project
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className={`px-2 py-1 rounded-sm cursor-pointer border border-[var(--bg-secondary)] ${
                      cat === category
                        ? "bg-[var(--bg-secondary)] text-[var(--color-light)]"
                        : "bg-transparent text-[var(--color-primary)]"
                    }`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
            {!category && (
              <p className="text-red-500 text-sm mt-2">
                *Please select a category
              </p>
            )}

            <div className="my-8">
              <h2 className="text-lg text-[var(--color-primary)] font-medium my-2">
                Live link of your project(if any)
              </h2>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="url"
                className=" w-full bg-transparent border-b border-[var(--bg-secondary)]"
              />
              {link && !validUrl.test(link) && (
                <p className="text-red-500 text-sm mt-2">invalid link</p>
              )}
            </div>
          </div>

          {/* preview */}
          <div className="md:w-2/4 w-full text-black">
            <h2 className="text-2xl text-[var(--color-primary)]  font-medium mt-12 text-center">
              Preview
            </h2>
            {/* preview box */}
            <div className="flex w-3/4 h-auto flex-col m-auto mt-4 bg-[var(--bg-quaternary)] pb-4">
              <img
                src={ data?.thumbnail?.url || data?.thumbnail}
                alt='project thumbnail'
                className="w-full aspect-video object-cover "
              />
              <div className="flex justify-between items-center p-2 w-full">
                <div className="font-medium text-lg w-2/3 text-[var(--color-primary)] ">
                  <p>{title || "Untitled Project"}</p>
                </div>
                <div className="flex items-center justify-end gap-1 w-1/3 font-medium uppercase text-sm ">
                  <span> {category || "uncategorized"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-14 px-10 space-x-8 font-medium ">
              <button className="text-red-600 " onClick={() => setPhase(1)}>
                Cancel
              </button>
              <button
                className="text-[var(--color-light)] bg-[var(--bg-secondary)] px-3 py-1 rounded-sm"
                type="submit"
                onClick={publishProject}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

   

      {/* when the project is being uploaded or being updated  */}
      {(isPendingUploading || isSuccessUploading || isPendingUpdating || isSuccessUpdating) && (
        <div className="absolute z-[200] top-0 left-0 w-screen bg-[var(--bg-primary)] h-screen ">
          <div className="flex items-center pb-20 gap-2 h-full justify-center flex-col text-[var(--color-primary)] relative">
            {(isPendingUploading || isPendingUpdating) && (
              <>
                <p className="absolute mt-20 text-2xl capitalize font-semibold ">
                  {isPendingUpdating ? "updating"
                   : "uploading"} your project, please wait...
                </p>
              </>
            )}
            {(isSuccessUploading || isSuccessUpdating) && (
              <>
        <FaRegCheckCircle className="text-8xl" />
          <p className="text-xl font-medium capitalize">
            project {isSuccessUpdating ? "updated" : "published"} successfuly
          </p>


          <Link to={`/projects/${projectId}`}><Button styles={`text-lg bg-[var(--bg-secondary)] capitalize mt-2`} >view project</Button></Link>
<ShareMenu styles={`bottom-24 capitalize`}  destinationurl={`localhost://projects/${projectId}`}/>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectEditorPhase2;
