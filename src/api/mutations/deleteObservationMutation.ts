import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

// Observation delete fetch
async function deleteObservation(id: string) {
  const response = await fetch(`/api/observations/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete observation');
  }
}

// DELETE observation hook
export function useDeleteObservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteObservation,
    onSuccess: async () => {
      // Optimistic :D updates of observations entries
      await queryClient.invalidateQueries({
        queryKey: ['observations'],
      });
    },
    onError: (error) => {
      console.error('Error deleting observation:', error);
    },
  });
}
