import { Skeleton, Card, CardContent, Typography } from '@mui/material';

import { useMoonPhaseData } from '../api/queries/moonPhaseQuery';

import { moonPhaseEmoji } from '../utils/moon';

export default function MoonPhaseWidget() {
  const { data, isLoading } = useMoonPhaseData();

  const today = new Date().toDateString();

  return (
    <Card sx={{ height: '100%', p: 2, pl: 4 }}>
      <CardContent sx={{ height: '100%', p: 0 }}>
        <Typography
          gutterBottom
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase', pb: 1 }}
        >
          Today&apos;s Moon phase
        </Typography>
        <Typography sx={{ fontSize: { xs: 24, md: 64 } }}>
          {isLoading ? (
            <Skeleton variant="rectangular"></Skeleton>
          ) : (
            moonPhaseEmoji(data?.phase || 'New Moon')
          )}
        </Typography>

        {isLoading ? (
          <Skeleton variant="rectangular">
            <Typography variant="h5" component="p"></Typography>
          </Skeleton>
        ) : (
          <Typography variant="h5" component="p">
            {data?.phase}
          </Typography>
        )}

        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{today}</Typography>
        {isLoading ? (
          <Skeleton variant="rectangular">
            <Typography variant="body2"></Typography>
          </Skeleton>
        ) : (
          <Typography variant="body2">
            Illumination: {`${data?.illumination.toFixed(2)}%`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
