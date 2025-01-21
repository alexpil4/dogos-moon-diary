import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import NotificationSnackbar from './NotificationSnackbar';

describe('NotificationSnackbar test', () => {
  test('Renders the snackbar with the correct message and severity', () => {
    render(<NotificationSnackbar open={true} message="Message in a bottle!" severity="success" />);

    expect(screen.getByText('Message in a bottle!')).toBeInTheDocument();

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardSuccess');
  });

  test('Not render the snackbar when "open" is false', () => {
    render(
      <NotificationSnackbar
        open={false}
        message="ops..this should not be visible"
        severity="info"
      />,
    );

    // Ensure the message is not visible
    expect(screen.queryByText('Opsss..this should not be visible')).not.toBeInTheDocument();
  });
});
