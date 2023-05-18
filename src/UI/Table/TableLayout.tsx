import { DataGrid} from '@mui/x-data-grid';






export const BlankDataGridTable = () => {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={[]} columns={[]}  />
    </div>
  );
};



