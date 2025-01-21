import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { Observation } from '../../types';

// Observation update fetch
async function updateObservation(observation: Observation): Promise<Observation> {
  const response = await fetch(`/api/observations/${observation.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(observation),
  });

  if (!response.ok) {
    throw new Error('Failed to update observation');
  }

  return response.json() as unknown as Observation;
}

// UPDATE observation hook
export function useUpdateObservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateObservation,
    onSuccess: async () => {
      // Optimistic :D updates of observations entries
      await queryClient.invalidateQueries({
        queryKey: ['observations'],
      });
    },
    onError: (error) => {
      console.error('Error updating observation:', error);
    },
  });
}
