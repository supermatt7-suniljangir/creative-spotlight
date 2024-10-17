import { supabase } from "./supabase";

export async function getSettings(userId){
        const { data: settings, error } = await supabase
          .from("settings")
          .select("*")
          .eq("userId", userId)
          .single();
        if (error) {
          throw new Error(err.message);
        }
        return { settings, error };
}


export async function createSettings(userId){
const { data, error } = await supabase
.from('settings')
.insert([
  { allow_likes:true, allow_messages:true, public_profile:true, userId },
])
.select()
if(error) throw new Error(error.message)

return {data, error}
}
  export async function updateSettings(updateData, userId) {
   
    const { data, error } = await supabase
      .from("settings")
      .update(updateData)
      .eq("userId", userId)
      .select();
  
    if (error) throw new Error(error.message);
    return {data, error};
  }