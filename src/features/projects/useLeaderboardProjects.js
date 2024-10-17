import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardProjects as getLeaderBoardProjectsApi} from "../../services/apiProjects";

export function useLeaderBoardProjects(){
 const {data:leaderboardData, isLoading}  = useQuery({
        queryFn:getLeaderBoardProjectsApi,
        queryKey:['leaderboard'],
    })
    return {leaderboardData, isLoading};
}