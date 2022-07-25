import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell></TableCell>
          <TableCell>Total dishes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="pl-3 fw-normal">{item?.name}</TableCell>
            <TableCell>{item?.description}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>{''}</TableCell>
            <TableCell>
              {/* <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
