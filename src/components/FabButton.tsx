import { Tooltip, Fab } from '@mui/material';

type Props = {
  tooltipDescription: string;
  handleClick: (event: React.FormEvent) => void;
  bottom?: number;
  right?: number;
  icon: React.ReactNode;
  color?: 'success' | 'error' | 'info' | 'warning' | 'primary' | 'secondary';
  disable?: boolean;
};

export default function FabButton(props: Props) {
  const {
    tooltipDescription,
    handleClick,
    bottom = 20,
    right = 30,
    icon,
    color = 'primary',
    disable = false,
  } = props;

  return (
    <Tooltip title={tooltipDescription}>
      <Fab
        disabled={disable}
        color={color}
        aria-label="add"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom,
          right,
        }}
      >
        {icon}
      </Fab>
    </Tooltip>
  );
}
