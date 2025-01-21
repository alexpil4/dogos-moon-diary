import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { ObservationsAPIResponse, useObservations } from '../api/queries/observationsQuery';
import { Observation } from '../types';

type ObservationsContextType = {
  observations: ObservationsAPIResponse;
  loading: boolean;
};

// Context creation
const ObservationsContext = createContext<ObservationsContextType | undefined>(undefined);

// Context provider
export const ObservationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading: isLoadingObservations } = useObservations();

  const [observations, setObservations] = useState<ObservationsAPIResponse>({
    observations: [],
    total: 0,
  });

  useEffect(() => {
    if (data) {
      setObservations(data);
    }
  }, [data]);

  return (
    <ObservationsContext.Provider
      value={{
        observations,
        loading: isLoadingObservations,
      }}
    >
      {children}
    </ObservationsContext.Provider>
  );
};

export { ObservationsContext };
export type { Observation, ObservationsContextType };
