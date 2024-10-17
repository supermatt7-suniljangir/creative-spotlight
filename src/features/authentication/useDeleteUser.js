import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser as deleteUserApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useDeleteUser(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: deleteUser, isPending, isSuccess} = useMutation({
        mutationFn:({userId})=>deleteUserApi(userId),
onSuccess:()=>{
    queryClient.removeQueries()
    toast.success('account deleted successfuly');
navigate("/login");
},
onError:(error)=>{
    console.log(error)
    toast.error(error.message)
}
    });
    return {isPending, isSuccess, deleteUser}
}