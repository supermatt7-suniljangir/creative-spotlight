import toast from "react-hot-toast";
import { supabase } from "./supabase";
import { useQueryClient } from "@tanstack/react-query";
import {useEffect} from "react";
export async function sendMessage(receiverId, senderId, message){

const { data, error } = await supabase
.from('messages')
.insert([{receiverId, senderId, message}])
.select();

if(error){
    console.log(error.message);
    toast.error("there was an error while sending the message");
    throw new Error(error.message);
}
return {data};
}


export async function getMessages(userId){
   const {data, error} =  await supabase
    .from('messages')
    .select('*')
    .or(`senderId.eq.${userId},receiverId.eq.${userId}`).order("created_at", {ascending:false})
  
    if(error){
        console.error(error.message);
        throw new Error(error.message);
    }
return data;
}

export async function getSpecificConversation(userId, receiverId){
    const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(
        `and(senderId.eq.${userId},receiverId.eq.${receiverId}),and(senderId.eq.${receiverId},receiverId.eq.${userId})`
    )
    .order('created_at', { ascending: true });

if (error) {
    console.error('Error fetching messages:', error);
    
}
return data;
}

export async function deleteConversation(userId, receiverId){
  console.log(userId, receiverId)
  const {  error } = await supabase
  .from('messages')
  .delete()
  .or(
      `and(senderId.eq.${userId},receiverId.eq.${receiverId}),and(senderId.eq.${receiverId},receiverId.eq.${userId})`
  )
  .order('created_at', { ascending: true });

if (error) {
  console.error('Error fetching messages:', error);
  
}
}





export function useMessageSubscription() {
    const queryClient = useQueryClient();
    useEffect(() => {
      const channel = supabase
        .channel('message-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
          },
          (payload) => {
            queryClient.invalidateQueries({active:true});
          }
        )
        .subscribe();


    return () => {
      supabase.removeChannel(channel);
    };
    }, [queryClient]);
  }
  
