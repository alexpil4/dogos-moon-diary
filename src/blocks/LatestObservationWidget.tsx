import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  Skeleton,
  TableRow,
  Typography,
  TableContainer,
  TableHead,
  TableFooter,
  IconButton,
} from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Observation } from '../types';
import { useObservations } from '../api/queries/observationsQuery';
import { moonPhaseEmoji } from '../utils/moon';
import AnimatedProgressBar from '../components/AnimatedProgressBar';

export default function LatestObservationWidget() {
  // QUERY
  const { data, isLoading } = useObservations({ take: 5 });

  return (
    <Card sx={{ p: 2, pl: 4, pb: 1 }}>
      <Typography
        gutterBottom
        color="primary"
        sx={{ fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase', pb: 1 }}
      >
        Latest observations
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date - Time</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell>Illumination</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ mb: 4 }}>
            {data && !isLoading
              ? data.observations.map((observation: Observation) => (
                  <TableRow
                    key={observation.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Box>
                        <Typography color="primary" variant="body2">
                          {moment(observation.date).format('MM/DD/YYYY HH:mm')}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography component="span" variant="body1" mr={2}>
                        {moonPhaseEmoji(observation.phase)}
                      </Typography>
                      <Typography component="span" variant="body2">
                        {observation.phase}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {observation.illumination} %
                      <AnimatedProgressBar
                        targetValue={observation.illumination}
                        animationDuration={300}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : new Array(5).fill(null).map((_, index) => (
                  <TableRow
                    key={`${index}_skeleton`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell colSpan={3}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ ml: 'auto', mt: 2 }}
                >
                  <Typography color="primary" variant="body2" mr={1}>
                    View all observations
                  </Typography>
                  <Link to="/observations">
                    <IconButton color="primary" edge="end" aria-label="details">
                      <ArrowForwardIcon />
                    </IconButton>
                  </Link>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {!isLoading && (!data?.observations || data.observations.length === 0) && (
        <Typography variant="body2" textAlign="center" py={4}>
          No observations available.
        </Typography>
      )}
    </Card>
  );
}
