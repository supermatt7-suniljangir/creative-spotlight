import { createProfile } from "./apiProfile";
import { createSettings } from "./apiSettings";
import {SERVER_ROLE_KEY, supabase, supabaseUrl} from "./supabase"
import { createClient } from '@supabase/supabase-js'


export async function login({email, password}){
let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if(error) throw new Error(error.message);
  return data;
}


export async function signup({ fullName, email, password }) {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      }
    }
  });

  if (signupError) throw new Error(signupError.message);

  // Automatically log in the user after successful signup
  const { data: loginData, error: loginError } = await login({email, password });
  if (loginError) throw new Error(loginError.message);

  // create a new user profile
  const {user:{id}} = signupData;
const {error:profileError} = createProfile({email, fullName, bio:"write something about you", userId:id, likedProjects:[]});
  if (profileError) throw new Error(profileError.message);

// create settings for the account
const {error:settingsError} = await createSettings(id);
if(settingsError) throw new Error(settingsError.message)
  return { signupData, loginData };
}


export async function getCurrentUser(){
  const {data:session} =  await supabase.auth.getSession();
if(!session.session) return null; 
const {data, error} = await supabase.auth.getUser();
if(error) throw new Error(error.message);
return data?.user;
}
export async function logout(){
 const {error} = await supabase.auth.signOut(); 
 if(error) throw new Error(error.message);

}
export async function updateCurrentUser({password, fullName, avatar}){
let updateData;

if(password) updateData = {password};
if(fullName) updateData = {data: {
  fullName
}}
  // 1. update the password or fullname
const {data, error} = await supabase.auth.updateUser(updateData);
if(error) throw new Error(error.message);

if(!avatar) return data;
  // 2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`

const {error: uploadError} = await supabase.storage.from("avatars").upload(fileName, avatar)
if(uploadError) throw new Error(uploadError.message);

  // 3. update the avatar in the user
const {data : updatedUser, error:error2} = await supabase.auth.updateUser({data: {avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`}})
if(error2) throw new Error(error2.message);

return updatedUser;
}

export async function deleteUser(userId) {
  const supabaseUrl = 'https://pcfgmvjdcqcbiichaacn.supabase.co'
  
const supabaseKey = SERVER_ROLE_KEY// Ensure this is the service role key
const supabase = createClient(supabaseUrl, supabaseKey)
   // Delete the user profile
  const { error: profileError } = await supabase
    .from('profiles')
    .delete()
    .eq('userId', userId)
  if (profileError) throw new Error(profileError.message)

  // Delete the user settings
  const { error: settingsError } = await supabase
    .from('settings')
    .delete()
    .eq('userId', userId)
  if (settingsError) throw new Error(settingsError.message)

 // Delete the user from Supabase authentication
 const { error: authError } = await supabase.auth.admin.deleteUser(userId);
 if (authError) throw new Error(authError.message)
}