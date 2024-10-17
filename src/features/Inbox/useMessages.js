import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getMessages } from '../../services/apiInbox'

function useMessages(userId) {
  const {data, isLoading} = useQuery({
    queryFn:()=>getMessages(userId),
    queryKey:['messages', userId],
  })
  return {data, isLoading}
}

export default useMessages