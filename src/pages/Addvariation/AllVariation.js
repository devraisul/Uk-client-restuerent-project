import {
  Table, TableBody,
  TableCell, TableHead, TableRow
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import { getVariation } from "../../Apis/variation";
import { useAuth } from "../../context/AuthContext";

const AllVariation = () => {
  const { user } = useAuth();
  const [variationData, setVariationData] = useState([])
  useEffect(() => {
    getVariation(user.restaurant[0].id)
      .then(res => {
        setVariationData(res.data);
      })
  },[])
  return (
    <>
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variationData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="pl-3 fw-normal">{index + 1}</TableCell>
              <TableCell className="pl-3 fw-normal">{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell> <Edit /></TableCell>
              <TableCell><Delete /></TableCell>
              <TableCell>
                {/* <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} /> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AllVariation;