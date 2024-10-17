import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeProject } from '../../services/apiProjects';

function useLikeProjects() {
    const queryClient = useQueryClient();
    const {mutate:handleLike, isPending, isSuccess, error} = useMutation({
        mutationFn: ({userId, projectId, likes, liked})=>likeProject(userId, projectId, likes, liked),
        onError: (error) => {
          console.log(error);
          toast.error("there was an error while handling likes")
        },
        onSuccess:()=>{
          queryClient.invalidateQueries({active:true});
        }
      })
    
        return {handleLike, error, isSuccess, isPending}
}

export default useLikeProjects;