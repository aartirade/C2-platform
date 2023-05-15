import React, { useState, useEffect, useContext } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { StudentData } from "../../data/data";
import {
  Flex,
  Button,
  Select,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Text,
} from "@chakra-ui/react";
import { InstituteContext } from "../../Content/InstituteContext";
import { DownloadIcon, HamburgerIcon } from "@chakra-ui/icons";
import TableComponent from "./TableComponent";
import SearchBar from "./SearchBar";

const Ranking = ({ instituteData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const { institutes, departments } = useContext(InstituteContext);
  useEffect(() => {
    setData(instituteData.student);
  }, []);

  return (
    <>
      <Flex mb={20} gap={6} direction={{ base: "column" }} p={4}>
        <Flex
          width={"full"}
          gap={"10px"}
          direction={{ base: "column", md: "row" }}
        >
          <SearchBar
            data={data}
            setData={setData}
            instituteData={instituteData}
            name="Search"
          />
          <Flex gap={"10px"}>
            <Select
              onChange={(e) => {
                if (e.target.value === "all") {
                  setData(instituteData.student);
                  return;
                }
                setData(
                  instituteData.student.filter((student) => {
                    return student.institute.departmentCode === e.target.value;
                  })
                );
              }}
              variant="filled"
              _focus={{ bg: "white", _placeholder: { color: "grey.400" } }}
            >
              {" "}
              <option value="all" selected>
                All
              </option>
              {departments.map((department) => (
                <option value={department.departmentCode}>
                  {department.department_name}
                </option>
              ))}
            </Select>
            <Select variant="filled" placeholder="ALL">
              {" "}
              <option value="option1">GFG</option>
              <option value="option2">LeetCode</option>
              <option value="option3">HackerRank</option>
              <option value="option3">Github</option>
            </Select>
          </Flex>

          {/* This is Analytics Button */}

          <Button onClick={onOpen} rightIcon={<HamburgerIcon />}>
            Analytics
          </Button>

          {/* This is Download Button */}

          <Button rightIcon={<DownloadIcon />}>Download</Button>
        </Flex>

        {/* This is Table Component */}

        <Flex width={"full"}>
          <TableComponent data={data} />
        </Flex>
      </Flex>

      {/* This is a Drawer */}

      <Drawer onClose={onClose} isOpen={isOpen} size={{ base: "sm", md: "md" }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Pie Chart</DrawerHeader>
          <DrawerBody>
            <p>Some data regarding pie chart</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Ranking;
