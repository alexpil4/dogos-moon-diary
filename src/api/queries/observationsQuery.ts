import { useQuery } from '@tanstack/react-query';

import { Observation } from '../../types';

export type ObservationsAPIResponse = {
  observations: Observation[];
  total: number;
};

async function fetchObservations(params?: { take?: number }): Promise<ObservationsAPIResponse> {
  const takeParam = params ? `?take=${params.take}` : '';

  const response = await fetch(`/api/observations${takeParam}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as unknown as ObservationsAPIResponse;
}

export function useObservations(params?: { take?: number }) {
  return useQuery({
    queryKey: ['observations', params],
    queryFn: () => fetchObservations(params),
  });
}
