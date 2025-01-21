export type MoonPhase =
  | 'New Moon'
  | 'Waxing crescent'
  | 'First quarter'
  | 'Waxing gibbous'
  | 'Full Moon'
  | 'Waning gibbous'
  | 'Last quarter'
  | 'Waning crescent';

export type Observation = {
  id: string;
  date: string;
  phase: MoonPhase;
  illumination: number;
  notes: string;
};

export type FormObservation = Omit<Observation, 'id'>;

export type MoonPhaseData = {
  phase: MoonPhase;
  illumination: number;
};
