import { useQuery } from '@tanstack/react-query'
import { getSettings as getSettingsApi } from '../../services/apiSettings';

function useSettings(userId) {
 const {data:settingsData, isLoading } =  useQuery({
queryFn:()=>getSettingsApi(userId),
queryKey:['settings'],
});
return {settingsData, isLoading}
}

export default useSettings