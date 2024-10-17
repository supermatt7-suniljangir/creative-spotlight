import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile as updateProfileApi } from '../../services/apiProfile'
import toast from 'react-hot-toast';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending, isSuccess } = useMutation({
    mutationFn: async ({ profileData, userId }) => {
      await updateProfileApi(profileData, userId);
    },
    onSuccess: async () => {

      // Introduce a short delay before invalidating and refetching
      await new Promise(resolve => setTimeout(resolve, 100));
      toast.success("Profile updated successfully");
      await queryClient.invalidateQueries('profile');
      await queryClient.refetchQueries('profile'); // Force refetch the profile query
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    }
  });

  return { updateProfile, isPending, isSuccess };
}
