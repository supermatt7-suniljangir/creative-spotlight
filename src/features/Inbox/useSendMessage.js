import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sendMessage as sendMessageApi } from '../../services/apiInbox'
import toast from 'react-hot-toast'

function useSendMessage() {
   let queryClient = useQueryClient();
 const {isLoading, mutate:sendMessage} = useMutation({
    mutationFn:({receiverId, senderId, message})=>{
      sendMessageApi(receiverId, senderId, message)},
    onSuccess:()=>{
      queryClient.invalidateQueries({active:true})
      
    },
    onError:(error)=>{
      console.log(error)
    }
 })
 return {sendMessage, isLoading}; 
}

export default useSendMessage;