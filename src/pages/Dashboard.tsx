import { Box, Stack } from '@mui/material';

import MoonPhaseWidget from '../blocks/MoonPhaseWidget';
import ObservationPhaseStats from '../blocks/ObservationPhaseStats';
import LatestObservationWidget from './../blocks/LatestObservationWidget';
import TopFiveMonthsStats from './../blocks/TopFiveMonthsStats';

export default function Dashboard() {
  return (
    <Stack direction="column" height="100%" spacing={2} useFlexGap>
      <Stack direction="row" height="40%" spacing={2} useFlexGap>
        <Box width="25%" height="100%">
          <MoonPhaseWidget />
        </Box>
        <Stack direction="row" flex={1} width="100%" spacing={2} useFlexGap>
          <Box width="40%" height="100%">
            <ObservationPhaseStats />
          </Box>
          <Box width="60%" height="100%">
            <TopFiveMonthsStats />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2} useFlexGap>
        <LatestObservationWidget />
      </Stack>
    </Stack>
  );
}
