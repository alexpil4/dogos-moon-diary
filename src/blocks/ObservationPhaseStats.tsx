import { useMemo } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { countBy } from 'lodash';

import { useObservations } from '../api/queries/observationsQuery';
import { moonPhaseEmoji } from '../utils/moon';
import { MoonPhase } from '../types';

export default function ObservationPhaseStats() {
  const { data, isLoading } = useObservations();

  return (
    <Card sx={{ height: '100%', p: 2, pl: 4 }}>
      <CardContent sx={{ height: '100%', p: 0 }}>
        <Typography
          gutterBottom
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' }}
        >
          Observations statistics
        </Typography>

        <PieChart
          loading={isLoading}
          margin={{ right: 0 }}
          slotProps={{ legend: { hidden: true } }}
          series={[
            {
              data: useMemo(() => {
                const stats = countBy(data?.observations.map((observation) => observation.phase));
                return Object.entries(stats).map(([key, value]) => ({
                  id: key,
                  value,
                  label: key,
                }));
              }, [data]),
              arcLabel: (item) => moonPhaseEmoji(item.label as MoonPhase) || '',
              arcLabelRadius: '80%',
              innerRadius: '50%',
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
