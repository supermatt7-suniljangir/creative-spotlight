import { useSearchParams } from "react-router-dom";
import { supabase, supabaseUrl } from "./supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";





export async function deleteProject(projectId){
  const { error } = await supabase
  .from("projects")
  .delete().eq("projectId", projectId)
  
if(error){
  console.log(error);
  throw new Error("something went wrong while deleting the project", error)
}
}











export async function getLeaderBoardProjects() {
  let { data: projects, error } = await supabase
    .from("projects")
    .select(
      `
        userId,
        projectId,
        likes,
        title,
        thumbnail,
        category,
        profiles(fullName, avatar)
      `
    )
    .order("likes", { ascending: false })
    .limit(10);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  // Format the data to include fullName at the top level
  const formattedProjects = projects.map((project) => ({
    ...project,
    fullName: project.profiles?.fullName || "Unknown",
    avatar: project.profiles?.avatar || "",
  }));

  return formattedProjects;
}

export async function getProjects(
  userId,
  sortField,
  order,
  filterField,
  filterValue,
  searchValue,
  selectedQueries
) {
  let query = supabase.from("projects").select(`*, profiles(fullName, avatar)`);

  if (!userId && !searchValue && !selectedQueries) query = query.limit(9);

  if (userId) query = query.eq("userId", userId);
  if (filterField && filterValue !== "all")
    query = query.eq(filterField, filterValue);

  if (searchValue && searchValue.length > 1)
    query = query.or(
      `description.ilike.%${searchValue}%,title.ilike.%${searchValue}%,category.ilike.%${searchValue},tags.cs.{${searchValue}}`
    );

  if (selectedQueries && selectedQueries.length > 0) {
    const selectedQueriesNew = selectedQueries.split(",");
    const queryParts = selectedQueriesNew
      .map(
        (value) =>
          `description.ilike.%${value}%,title.ilike.%${value}%,category.ilike.%${value}%,tags.cs.{${value}}`
      )
      .join(",");
    query = query.or(queryParts);
  }
  // Apply sorting
  if (sortField && order)
    query = query.order(sortField, { ascending: order === "asc" });

  let { data: userProjects, error } = await query;

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  const formattedProjects = userProjects.map((project) => ({
    ...project,
    fullName: project.profiles?.fullName || "Unknown",
    avatar: project.profiles?.avatar || "",
  }));

  return formattedProjects;
}

export async function getProject(projectId) {
  let { data: project, error } = await supabase
    .from("projects")
    .select(`*,profiles(fullName, avatar)`)
    .eq("projectId", projectId)
    .single();

  if (error) {
    throw new Error("something went wrong", error.message);
  }
  const formattedProjects = {
    ...project,
    fullName: project.profiles?.fullName || "Unknown",
    avatar: project.profiles?.avatar || "",
  };

  return formattedProjects;
}

export async function likeProject(userId, projectId, likes, liked) {
  const { data, error } = await supabase
    .from("projects")
    .update({ likes: liked ? likes - 1 : likes + 1 })
    .eq("projectId", projectId)
    .select();

  // get profile data
  const { data: existingProfileLikes, error: likesfetchError } = await supabase
    .from("profiles")
    .select("likedProjects")
    .eq("userId", userId)
    .single();

  const { likedProjects } = existingProfileLikes;

  const updatedProfileLikes = liked
    ? likedProjects.filter((project) => project !== projectId)
    : [...likedProjects, projectId];

  const { error: profileUpdateError } = await supabase
    .from("profiles")
    .update({ likedProjects: updatedProfileLikes })
    .eq("userId", userId);

  if (profileUpdateError) {
    throw new Error(profileUpdateError.message);
  }

  if (error) {
    console.log(error);
    toast.error("there was an error while appreciating the art");
    throw new Error(error.message);
  }
  return { data, error };

}

export async function getAppreciations(projectIds) {
  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles(fullName, avatar)")
    .in("projectId", projectIds);

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return { data };
}

// create a project
export async function createProject(projectData) {
  let imageUrls = [];
  let thumbPath = "";
  //  upload images first
  projectData.images.forEach(async function (img) {
    if (img && typeof img === "object") {
      const imageName = `${Math.random().toFixed(5)}-${img.name}`.replaceAll(
        "/",
        ""
      );
      const imagePath = `${supabaseUrl}/storage/v1/object/public/projectsImages/${imageName}`;
      imageUrls.push(imagePath);
      const { error: uploadError } = await supabase.storage
        .from("projectsImages")
        .upload(imageName, img.image);
      if (uploadError)
        throw new Error("error uploading images" + uploadError.message);
    }
  });


  
  // upload the thumbnail
  if (typeof projectData?.thumbnail === "object") {
    const thumbName = `${Math.random().toFixed(5)}-${
      projectData.thumbnail?.name
    }`.replaceAll("/", "");
    thumbPath = `${supabaseUrl}/storage/v1/object/public/projectsImages/${thumbName}`;
    const { error: uploadError } = await supabase.storage
      .from("projectsImages")
      .upload(thumbName, projectData.thumbnail.image);
    if (uploadError)
      throw new Error("error uploading thumbnail" + uploadError.message);
  }

  const finalData = {
    ...projectData,
    images: imageUrls,
    likes:0,
    thumbnail: thumbPath,
  };

  const { data, error } = await supabase
    .from("projects")
    .insert([finalData])
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return { data, error };
}





export async function updateProject(projectData) {
  let imageUrls = [];
  let thumbPath = "";
  // //  upload images first
  projectData.images.forEach(async function (img) {
    if (img) {
if(typeof img === "string" && img.startsWith(supabaseUrl)){
imageUrls.push(img);
} else{
  const imageName = `${Math.random().toFixed(5)}-${img.name}`.replaceAll("/","");
      const imagePath = `${supabaseUrl}/storage/v1/object/public/projectsImages/${imageName}`;
      imageUrls.push(imagePath);
         const { error: uploadError } = await supabase.storage
        .from("projectsImages")
        .upload(imageName, img.image);
      if (uploadError)
        throw new Error("error uploading images" + uploadError.message);
}
    }
  });

  // upload the thumbnail
  if (typeof projectData?.thumbnail === "object") {
    const thumbName = `${Math.random().toFixed(5)}-${
      projectData.thumbnail?.name
    }`.replaceAll("/", "");
    thumbPath = `${supabaseUrl}/storage/v1/object/public/projectsImages/${thumbName}`;
    const { error: uploadError } = await supabase.storage
      .from("projectsImages")
      .upload(thumbName, projectData.thumbnail.image);
    if (uploadError)
      throw new Error("error uploading thumbnail" + uploadError.message);
  }
  else thumbPath = projectData?.thumbnail;



  const finalData = {
    ...projectData,
    images: imageUrls,
    thumbnail: thumbPath,
  };

  const { data, error } = await supabase
    .from("projects")
    .update([finalData]).eq("projectId", projectData?.projectId)
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return { data, error };
}