import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { StudentData } from "../../data/data";
const TableComponent = ({ instituteData }) => {
  console.log("dddd", instituteData);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(instituteData.student);
  }, []);
  return (
    <>
      <TableContainer width={"full"}>
        <Table variant="simple">
          <TableCaption>This is Student Data</TableCaption>
          <Thead>
            <Tr fontSize={"md"} bg={"blue.800"}>
              <Th color="white">PRN no</Th>
              <Th color="white">Name</Th>
              <Th color="white">Department</Th>
              <Th color="white">OverScore</Th>
              <Th color="white">Ranking</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, key) => (
              <Tr key={key} color={"whiteAlpha.900"}>
                {console.log("item", item)}
                <Td>{item.institute.prn_no}</Td>
                <Td>{item.institute.name}</Td>
                <Td>CS</Td>
                <Td>{Math.floor(Math.random() * 50) + 1}</Td>
                <Td>{key + 1}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
