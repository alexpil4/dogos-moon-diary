import { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import FabButton from '../../components/FabButton';
import NotificationSnackbar from '../../components/NotificationSnackbar';
import ObservationTable from '../../blocks/ObservationTable';
import { useObservations } from '../../api/queries/observationsQuery';
import useNotificationWrapper from '../../hooks/useNotificationWrapper';
import ObservationForm from '../../blocks/ObservationForm';
import { Observation, FormObservation } from './../../types';

type IsObservationOpen = {
  open: boolean;
  observation?: Observation;
};

function ObservationPage() {
  // STATE
  const [isObservationOpen, setIsObservationOpen] = useState<IsObservationOpen>({
    open: false,
  });

  // QUERY
  const { data, isLoading: isLoadingObservations } = useObservations();

  // Notifications an mutations hook
  const {
    notification,
    setNotification,
    createObservation,
    updateObservation,
    deleteObservation,
    isLoading,
  } = useNotificationWrapper();

  // CLOSE snackbar
  const handleCloseSnackbar = () => setNotification({ open: false, message: '', severity: 'info' });

  // OPEN observation form
  const handleObservationOpen = (observation?: Observation) => {
    // UPDATE case
    if (observation) setIsObservationOpen({ open: true, observation });
    // CREATE case
    else setIsObservationOpen({ open: true });
  };

  // CLOSE observation form
  const closeObservationForm = () =>
    setIsObservationOpen({
      open: false,
    });

  // CREATE new observation
  const handleObservationCreateSubmit = (formData: FormObservation) => {
    createObservation(formData);
    closeObservationForm();
  };

  // UPDATE new observation
  const handleObservationUpdateSubmit = (formData: Observation) => {
    updateObservation(formData);
    closeObservationForm();
  };

  // UPDATE new observation
  const handleObservationDeleteSubmit = (id: string) => {
    deleteObservation(id);
    closeObservationForm();
  };

  return (
    <>
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseSnackbar}
      />

      <ObservationTable
        data={data}
        isLoading={isLoadingObservations || isLoading}
        onEdit={(observation) => handleObservationOpen(observation)}
        onDelete={(id) => handleObservationDeleteSubmit(id)}
      />

      <ObservationForm
        observation={isObservationOpen.observation}
        isOpen={isObservationOpen.open}
        addObservation={(formData) => handleObservationCreateSubmit(formData)}
        editObservation={(formData) => handleObservationUpdateSubmit(formData)}
        handleClose={closeObservationForm}
      />

      <FabButton
        tooltipDescription="Add a new observation"
        handleClick={() => handleObservationOpen()}
        icon={<PlaylistAddIcon />}
      />
    </>
  );
}

export default ObservationPage;
