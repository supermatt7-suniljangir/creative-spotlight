import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardProjects as getLeaderBoardProjectsApi, getProject} from "../../services/apiProjects";

export function useProject(projectId){
 const {data:project, isLoading}  = useQuery({
        queryFn:()=>getProject(projectId),
        queryKey:['project', projectId]
    })
    return {project, isLoading};
}