import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { Observation, FormObservation } from '../../types';

// Observation create fetch
async function createObservation(observation: FormObservation): Promise<Observation> {
  const response = await fetch('/api/observations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(observation),
  });

  if (!response.ok) {
    throw new Error('Failed to create observation');
  }

  return response.json() as unknown as Observation;
}

// CREATE observation hook
export function useCreateObservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createObservation,
    onSuccess: async () => {
      // Optimistic updates of observations entries
      return await queryClient.invalidateQueries({
        queryKey: ['observations'],
      });
    },
    onError: (error) => {
      console.error('Error creating observation:', error);
    },
  });
}
