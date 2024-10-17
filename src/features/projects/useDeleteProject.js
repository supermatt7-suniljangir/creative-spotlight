import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { deleteProject as deleteProjectApi } from '../../services/apiProjects';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useDeleteProject() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const {mutate:deleteProject, isPending, isSuccess, error} = useMutation({
        mutationFn: ({projectId})=>deleteProjectApi(projectId),
        onError: (error) => {
          console.log(error);
          toast.error("there was an error while deleting the project")
        },
        onSuccess:()=>{
          queryClient.invalidateQueries({active:true});
          toast.success("project deleted successfuly")
          navigate(`/projects/type/user`)
        }
      })
    
        return {deleteProject, error, isSuccess, isPending}
}

export default useDeleteProject