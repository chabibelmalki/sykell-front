
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import "./urlTable.css"


export default function URLTable({ rows, cancelFunction, selectedRows, setSelectedRows }) {

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const isSelected = (id) => selectedRows.includes(id);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedRows(rows.map((row) => row.id));
                  } else {
                    setSelectedRows([]);
                  }
                }}
              />
            </TableCell>
            <TableCell>Link</TableCell>
            <TableCell>HTML Version</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Heading Tags</TableCell>
            <TableCell align="right">Internal Links</TableCell>
            <TableCell align="right">External Links</TableCell>
            <TableCell align="right">Inaccessible Links</TableCell>
            <TableCell align="right">Login form</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.id}
              selected={isSelected(row.id)}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: isSelected(row.id) ? '#f0f0f0' : 'inherit'
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
              <TableCell component="th" scope="row" className='truncated-text'>
                {row.link}
              </TableCell>
              {row.isPending ? (
                <>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress size="1rem" />
                  </TableCell>
                  <TableCell colSpan={1} align="center">
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => cancelFunction(row.id)}
                    >
                      stop
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.details?.htmlVersion ?? "N/A"}</TableCell>
                  <TableCell>{row.details?.title ?? "N/A"}</TableCell>
                  <TableCell>
                    {row.details ? (
                      <ul className="custom-ul">
                        {Object.entries(row.details.headingTagsCount).map(([key, value]) => (
                          <li key={key} className="custom-li">
                            <strong>h{key}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell align="right">{row.details?.internalLinksCount ?? "N/A"}</TableCell>
                  <TableCell align="right">{row.details?.externalLinksCount ?? "N/A"}</TableCell>
                  <TableCell align="right">{row.details?.inaccessibleLinksCount ?? "N/A"}</TableCell>
                  <TableCell align="right">{row.details?.isLoginPage ? "Yes" : "No" ?? "N/A"}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}