import { useQuery } from '@tanstack/react-query';
import { getSpecificConversation } from '../../services/apiInbox';

function useConversation(userId, receiverId) {
  const {data, isLoading} = useQuery({
    queryFn:()=>getSpecificConversation(userId, receiverId),
    queryKey:['message', userId, receiverId],
  })
  return {data, isLoading}


}

export default useConversation