import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FabButton from './FabButton';

describe('FabButton Component', () => {
  test('It render the FabButton with the icon', () => {
    render(
      <FabButton
        tooltipDescription="Click me!"
        handleClick={() => {}}
        icon={<PlaylistAddIcon />}
        color="primary"
      />,
    );

    const icon = screen.getByTestId('PlaylistAddIcon');
    expect(icon).toBeInTheDocument();
  });

  test('It calls handleClick when FabButton is clicked', () => {
    const handleClick = vi.fn();

    render(
      <FabButton
        tooltipDescription="Click me!"
        handleClick={handleClick}
        icon={<PlaylistAddIcon />}
      />,
    );

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Disables the FabButton when disable is true', () => {
    render(
      <FabButton
        tooltipDescription="Disabled Button"
        handleClick={() => console.log('test!')}
        icon={<PlaylistAddIcon />}
        disable
      />,
    );

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeDisabled();
  });

  test('It applies position styles', () => {
    render(
      <FabButton
        tooltipDescription="Custom Position"
        handleClick={() => {}}
        icon={<PlaylistAddIcon />}
        bottom={25}
        right={25}
      />,
    );

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toHaveStyle('position: fixed');
    expect(button).toHaveStyle('bottom: 25px');
    expect(button).toHaveStyle('right: 25px');
  });
});
