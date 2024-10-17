import React from 'react'
import { createProject as createProjectApi } from '../../services/apiProjects'
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useCreateProject() {
  const queryClient = useQueryClient();

const {mutate:createProject, isPending, isSuccess, error} = useMutation({
    mutationFn: ({projectData})=>createProjectApi(projectData),
    onError: (error) => {
      console.log(error);
      toast.error("there was an error while creating the project")
    },
    onSuccess:()=>{
      // queryClient.invalidateQueries({active:true})
      queryClient.refetchQueries('projects', {
        active: true,
      });
    }
  })

    return {createProject, error, isSuccess, isPending}
}

export default useCreateProject