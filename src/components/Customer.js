import { TableRow, TableCell } from "@mui/material";

const Customer = (param) => {
  return (
    <TableRow>
      <TableCell>{param.id}</TableCell>
      <TableCell><img src={param.image} alt="profile"/></TableCell>
      <TableCell>{param.name}</TableCell>
      <TableCell>{param.birthday}</TableCell>
      <TableCell>{param.gender}</TableCell>
      <TableCell>{param.job}</TableCell>
    </TableRow>
  );
}

export default Customer;