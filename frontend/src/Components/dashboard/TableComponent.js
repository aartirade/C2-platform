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
  Badge,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { StudentData } from "../../data/data";
const TableComponent = ({ data }) => {
  // console.log("dddd", instituteData);
  const navigate = useNavigate();
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
                <Td>
                  {" "}
                  <a
                    onClick={() => {
                      navigate("/profile");
                    }}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {item.institute.name}{" "}
                  </a>{" "}
                </Td>
                <Td>{item.institute.departmentCode}</Td>
                <Td>{Math.floor(Math.random() * 50) + 1}</Td>
                <Td>
                  {key + 1 === 1 ? (
                    <Badge
                      variant="solid"
                      color={"black"}
                      backgroundColor={"#FFD700"}
                    >
                      Ranked #1
                    </Badge>
                  ) : key + 1 === 2 ? (
                    <Badge
                      variant="solid"
                      color={"black"}
                      backgroundColor={"#C0C0C0"}
                    >
                      {" "}
                      Ranked #2{" "}
                    </Badge>
                  ) : key + 1 === 3 ? (
                    <Badge
                      variant="solid"
                      color={"black"}
                      backgroundColor={"#CD7F32"}
                    >
                      {" "}
                      Ranked #3{" "}
                    </Badge>
                  ) : (
                    <Badge
                      variant="solid"
                      color={"white"}
                      // backgroundColor={"#FFD700"}
                    >
                      {" "}
                      #{key + 1}{" "}
                    </Badge>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
