import { supabase, supabaseUrl } from "./supabase";

export async function createProfile(profileData) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profileData])
    .select();
  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function getProfile(userId) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("userId", userId)
    .single();
  if (error) {
    throw new Error(err.message);
  }
  return { profile, error };
}

export async function updateProfile(updateData, userId) {
  const { avatar } = updateData;
  let imagePath = updateData.avatar;

  if (avatar && typeof avatar === 'object') {
    const imageName = `${Math.random().toFixed(2)}-${avatar.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`;

    const { error: uploadError } = await supabase.storage.from("avatar").upload(imageName, avatar);
    if (uploadError) throw new Error(uploadError.message);
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ ...updateData, avatar: imagePath })
    .eq("userId", userId)
    .select();

  if (error) throw new Error(error.message);
  return {data, error};
}

