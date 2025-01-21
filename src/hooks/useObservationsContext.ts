import { useContext } from 'react';
import { ObservationsContext, ObservationsContextType } from './../context/ObservationsContext';

// Custom hook for context access
export const useObservationsContext = (): ObservationsContextType => {
  const context = useContext(ObservationsContext);

  if (!context) {
    throw new Error('useObservations must be used inside ObservationsProvider');
  }

  return context;
};
