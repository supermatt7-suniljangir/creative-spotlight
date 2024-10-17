import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSettings as updateSettingsApi } from '../../services/apiSettings'
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending, isSuccess } = useMutation({
    mutationFn: async({settingsData, userId}) => {
        console.log(settingsData, userId)
      await updateSettingsApi(settingsData, userId);
    },
    onSuccess: async () => {
      // Introduce a short delay before invalidating and refetching
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries('settings');
      queryClient.refetchQueries('settings'); // Force refetch the profile query
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    }
  });

  return { updateSettings, isPending, isSuccess };
}
