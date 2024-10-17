import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAppreciations } from '../../services/apiProjects'

function useAppreciations(likedProjects) {
const {data, isLoading} = useQuery({
    queryFn:()=>getAppreciations(likedProjects),
    queryKey:['Appreciations', likedProjects]
})
return {data, isLoading}
}

export default useAppreciations