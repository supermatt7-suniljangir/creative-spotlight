import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteConversation as deleteConversationApi } from '../../services/apiInbox'
import toast from 'react-hot-toast';

function useDeleteChat() {
   let queryClient = useQueryClient();
 const {isPending, isSuccess, mutate:deleteConversation} = useMutation({
    mutationFn:({receiverId, senderId})=>{
      
        deleteConversationApi(receiverId, senderId)},
    onSuccess:()=>{
      queryClient.invalidateQueries(['messages']);
      toast.success("conversation deleted sucessfuly")
    },
    onError:(error)=>{
      console.log(error)
    }
 })
 return {deleteConversation, isPending, isSuccess}; 
}

export default useDeleteChat;