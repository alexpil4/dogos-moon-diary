import { useQuery } from '@tanstack/react-query';

import { MoonPhaseData } from '../../types';

async function fetchMoonPhaseData(): Promise<MoonPhaseData> {
  const response = await fetch('/api/moonphase');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json() as unknown as MoonPhaseData;
}

export function useMoonPhaseData() {
  return useQuery({
    queryKey: ['moonphase'],
    queryFn: fetchMoonPhaseData,
  });
}
