import { Snackbar, Alert, AlertColor } from '@mui/material';

type Props = {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose?: () => void;
};

export default function NotificationSnackbar(props: Props) {
  const { open, message, severity, onClose } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
