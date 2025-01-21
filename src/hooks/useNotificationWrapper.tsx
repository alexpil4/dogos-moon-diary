import { useState, useEffect } from 'react';
import { AlertColor } from '@mui/material';

import { useCreateObservation } from '../api/mutations/createObservationMutation';
import { useUpdateObservation } from '../api/mutations/updateObservationMutation';
import { useDeleteObservation } from '../api/mutations/deleteObservationMutation';

type Notification = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

export default function useNotificationWrapper() {
  // STATE
  const [notification, setNotification] = useState<Notification>({
    // Default state
    open: false,
    message: '',
    severity: 'info',
  });

  const {
    mutate: createObservation,
    isPending: createPending,
    isError: isErrorCreate,
    isSuccess: isSuccessCreate,
    error: createError,
  } = useCreateObservation();
  const {
    mutate: updateObservation,
    isPending: updatePending,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
    error: updateError,
  } = useUpdateObservation();
  const {
    mutate: deleteObservation,
    isPending: deletePending,
    isError: isErrorDelete,
    isSuccess: isSuccessDelete,
    error: deleteError,
  } = useDeleteObservation();

  useEffect(() => {
    // Handle success notifications
    if (isSuccessCreate || isSuccessUpdate || isSuccessDelete) {
      setNotification({
        open: true,
        message: 'Operation completed successfully!',
        severity: 'success',
      });
    }
    // Handle error notifications
    if (isErrorCreate || isErrorUpdate || isErrorDelete) {
      setNotification({
        open: true,
        message: `An error occurred: ${createError || updateError || deleteError}`,
        severity: 'error',
      });
    }
  }, [
    isErrorCreate,
    isErrorUpdate,
    isErrorDelete,
    isSuccessCreate,
    isSuccessUpdate,
    isSuccessDelete,
    createError,
    updateError,
    deleteError,
  ]);

  return {
    /** Notification data for the NotificationSnackbar component */
    notification,
    /** Update notification data for the NotificationSnackbar component */
    setNotification,
    /** Create observation mutation fn */
    createObservation,
    /** Update observation mutation fn */
    updateObservation,
    /** Delete observation mutation fn */
    deleteObservation,
    /** Mutation operation loader */
    isLoading: createPending || updatePending || deletePending,
  };
}
