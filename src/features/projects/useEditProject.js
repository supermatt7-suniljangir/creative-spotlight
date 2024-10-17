import React from 'react'
import { updateProject as updateProjectApi } from '../../services/apiProjects'
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useEditProject() {
  const queryClient = useQueryClient();

const {mutate:updateProject, isPending, isSuccess, error} = useMutation({
    mutationFn: ({projectData})=>updateProjectApi(projectData),
    onError: (error) => {
      console.log(error);
      toast.error("there was an error while updating the project")
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({active:true})
    }
  })

    return {updateProject, error, isSuccess, isPending}
}

export default useEditProject