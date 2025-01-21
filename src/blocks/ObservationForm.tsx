import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Grid2 as Grid,
  TextField,
  MenuItem,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import FabButton from '../components/FabButton';
import { Observation, FormObservation, MoonPhase } from '../types';
import { moonPhaseEmoji } from './../utils/moon';
import { useValidation } from './../hooks/useFormValidation';

type Props = {
  addObservation: (formData: FormObservation) => void;
  editObservation: (formData: Observation) => void;
  handleClose: () => void;
  isOpen: boolean;
  observation?: Observation;
};

const formInitialState: FormObservation = {
  date: moment().format('YYYY-MM-DD'),
  phase: 'New Moon',
  illumination: 0,
  notes: '',
};

const moonPhases: MoonPhase[] = [
  'New Moon',
  'Waxing crescent',
  'First quarter',
  'Waxing gibbous',
  'Full Moon',
  'Waning gibbous',
  'Last quarter',
  'Waning crescent',
];

export default function ObservationForm(props: Props) {
  const { addObservation, editObservation, handleClose, isOpen, observation } = props;

  // Form validation hook
  const { isError, formError, helperText, validateField } = useValidation();

  // Component states
  const [formData, setFormData] = useState(formInitialState);

  // Detect observation if it exists (edit mode)
  useEffect(() => {
    if (observation) {
      setFormData(observation);
    }
  }, [observation]);

  // Close component and reset form
  const close = () => {
    handleClose();
    setFormData(formInitialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Form state update
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'illumination' ? parseFloat(value) : value,
    }));
    // Handle the validation
    validateField(name, value);
  };

  const handleDateChange = (value: Moment | null, name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ? value.format() : null,
    }));
  };

  // Submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // UPDATE case
    if (observation) editObservation({ ...formData, id: observation.id });
    // CREATE case
    else addObservation(formData);

    // RESET the form
    setFormData(formInitialState);
  };

  return (
    <Drawer variant="temporary" anchor="right" open={isOpen}>
      <Box sx={{ maxWidth: 500, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{observation ? 'EDIT' : 'ADD A NEW'} OBSERVATION</Typography>
          <IconButton size="large" onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3} component="form" onSubmit={handleSubmit} mt={4} size={12}>
          <Grid size={6}>
            <DateTimePicker
              label="Date"
              onChange={(value) => handleDateChange(value, 'date')}
              value={formData.date ? moment(formData.date) : moment()}
            />
          </Grid>

          <Grid size={6} />

          <Grid size={6}>
            <TextField
              select
              fullWidth
              label="Lunar phase"
              name="phase"
              value={formData.phase}
              onChange={handleChange}
            >
              {moonPhases.map((phase) => (
                <MenuItem key={phase} value={phase}>
                  <ListItemText
                    sx={{ p: 0, m: 0 }}
                    primaryTypographyProps={{
                      sx: {
                        display: 'flex',
                        justifyContent: 'space-between',
                      },
                    }}
                  >
                    <Typography sx={{ p: 0, m: 0 }}>{phase}</Typography>
                    <Typography sx={{ p: 0, m: 0 }}>{moonPhaseEmoji(phase)}</Typography>
                  </ListItemText>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              type="number"
              label="Illumination (%)"
              name="illumination"
              value={formData.illumination}
              onChange={handleChange}
              error={formError.illumination}
              helperText={helperText.illumination}
              slotProps={{
                htmlInput: {
                  min: 0.0,
                  max: 100.0,
                  step: 0.1,
                },
              }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      <FabButton
        tooltipDescription={observation ? 'Edit current observation' : 'Add a new observation'}
        handleClick={handleSubmit}
        icon={observation ? <EditIcon /> : <AddIcon />}
        disable={isError}
      />
    </Drawer>
  );
}
