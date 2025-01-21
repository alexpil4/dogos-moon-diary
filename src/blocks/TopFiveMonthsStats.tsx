import { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { sortBy } from 'lodash';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography } from '@mui/material';

import { ObservationsAPIResponse, useObservations } from '../api/queries/observationsQuery';

type BarChartData = {
  monthNames: string[];
  counts: number[];
};

export default function TopFiveMonthsStats() {
  const { data } = useObservations();

  // STATE
  const [barChartData, setBarChartData] = useState<BarChartData>({
    monthNames: [],
    counts: [],
  });

  // CURRENT year number
  const currentYear = +moment().format('YYYY');

  const generateDataForBarChart = useCallback(
    (data: ObservationsAPIResponse): void => {
      // Return the array of current year observations
      const currentYearObservations = data?.observations.filter((observation) => {
        return moment(observation.date).year() === currentYear;
      });

      // Initialization
      const monthCounts: { [month: number]: number } = {};

      // For each 2024 observation
      currentYearObservations?.forEach((observation) => {
        // Extracts the month (0 to 11)
        const month = moment(observation.date).month();
        // Starting from 0 if a month already exists increment
        // the observation number of 1 for that month
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      // Return the array of months with their counts
      const monthArray = Object.entries(monthCounts).map(([month, count]) => ({
        month,
        count,
      }));

      // Sort by desc count and get only the first 5 months
      const sortedTopFiveMonths = sortBy(monthArray, (item) => -item.count).slice(0, 5);

      // Return the name of months for X axis of chart
      const monthNames = sortedTopFiveMonths.map((item) =>
        moment().month(item.month).format('MMMM'),
      );

      // Return the array of counts
      const counts = sortedTopFiveMonths.map((item) => item.count);

      // Set the data state for chart
      setBarChartData({ monthNames, counts });
    },
    [currentYear],
  );

  useEffect(() => {
    if (data) generateDataForBarChart(data);
  }, [data, generateDataForBarChart]);

  return (
    <Card sx={{ height: '100%', p: 2, pl: 4 }}>
      <CardContent sx={{ height: '100%', p: 0 }}>
        <Typography
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' }}
        >
          Top 5 Months of {currentYear} with the Most Observations
        </Typography>

        <BarChart
          series={[{ data: barChartData.counts, label: 'Observations', type: 'bar' }]}
          slotProps={{ legend: { hidden: true } }}
          xAxis={[
            {
              scaleType: 'band',
              data: barChartData.monthNames,
              colorMap: {
                type: 'ordinal',
                colors: ['#2b8cbe', '#4eb3d3', '#7bccc4', '#a8ddb5', '#ccebc5'],
              },
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
