import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import { moonPhaseEmoji } from '../utils/moon';
import moment from 'moment';

import { ObservationsAPIResponse } from '../api/queries/observationsQuery';
import { Observation } from '../types';

type Props = {
  data: ObservationsAPIResponse | undefined;
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (observation: Observation) => void;
};

export default function ObservationTable(props: Props) {
  const { data, isLoading, onEdit, onDelete } = props;

  const columns: GridColDef<Observation>[] = [
    {
      field: 'date',
      headerName: 'Date - Time',
      minWidth: 150,
      valueGetter: (_, row: Observation) => row.date,
      valueFormatter: (_, row: Observation) =>
        row.date && moment(row.date).format('MM/DD/YYYY HH:mm'),
    },
    {
      field: 'phase_icon',
      headerName: '',
      width: 60,
      valueGetter: (_, row: Observation) => moonPhaseEmoji(row.phase),
      align: 'center',
    },
    { field: 'phase', headerName: 'Phase', minWidth: 170 },
    {
      field: 'illumination',
      headerName: 'Illumination',
      valueFormatter: (value: number) => value && `${value.toFixed(2)}%`,
      minWidth: 140,
      align: 'center',
    },
    {
      field: 'notes',
      headerName: 'Notes',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,

      getActions: (params: { row: Observation }) => [
        <Tooltip title="Edit observation" key="edit">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => onEdit(params.row)}
          />
        </Tooltip>,
        <Tooltip title="Delete observation" key="delete">
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDelete(params.row.id)}
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <DataGrid
      rows={data?.observations}
      columns={columns}
      autoPageSize={true}
      loading={isLoading}
      slotProps={{
        loadingOverlay: {
          variant: 'skeleton',
          noRowsVariant: 'skeleton',
        },
      }}
      sx={{
        mb: 8,
      }}
    />
  );
}
