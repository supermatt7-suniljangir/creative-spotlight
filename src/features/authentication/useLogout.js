import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
onSuccess:()=>{
    queryClient.removeQueries()
    toast.success('you are logged out successfuly');
navigate("/login");
}   
    });
    return {isLoading, logout}
}