import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { signup as signupApi} from '../../services/apiAuth'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function useSignup() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
 const {mutate:signup, isPending, isSuccess} = useMutation({
    mutationFn: signupApi,
    onSuccess:async (user)=>{
        queryClient.refetchQueries('user');
        await new Promise(resolve => setTimeout(resolve, 500));
        toast.success("new user account created successfully");
        navigate("/");
    },
    onError:err=>{
        console.log(err)
        toast.error(err.message)}
 })
 return {signup, isPending, isSuccess}
}

export default useSignup