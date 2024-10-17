import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProfile } from '../../services/apiProfile'
import useUser from '../authentication/useUser';
import { useParams } from 'react-router-dom';

function useProfile(userId) {
 const {data:profileData, isLoading } =  useQuery({
queryFn:()=>getProfile(userId),
queryKey:['profile', userId],
});
return {profileData, isLoading}
}

export default useProfile