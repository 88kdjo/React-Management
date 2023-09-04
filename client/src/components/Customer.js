import { TableRow, TableCell } from "@mui/material";
import CustomerDelete from "./CustomerDelete";

const Customer = (param) => {
  return (
    <TableRow>
      <TableCell>{param.id}</TableCell>
      <TableCell><img src={param.image} style={{width: 64, height: 64}} alt="profile" /></TableCell>
      <TableCell>{param.name}</TableCell>
      <TableCell>{param.birthday}</TableCell>
      <TableCell>{param.gender}</TableCell>
      <TableCell>{param.job}</TableCell>
      <TableCell><CustomerDelete stateRefresh={param.stateRefresh} id={param.id} /></TableCell>
    </TableRow>
  );
}

export default Customer;