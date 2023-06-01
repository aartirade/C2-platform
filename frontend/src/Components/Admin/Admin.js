import React from "react";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  PhoneIcon,
  AddIcon,
  CalendarIcon,
  WarningIcon,
} from "@chakra-ui/icons";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      gap={12}
      w={"full"}
      h={"600px"}
      color={"white"}
      direction={"column"}
    >
      <Heading>Welcome Admin</Heading>
      <Flex>
        {/* For institute */}
        <Flex
          boxShadow={"2xl"}
          rounded={"lg"}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
          backgroundColor={"blue.900"}
          p={5}
          m={5}
          fontSize={"2xl"}
          gap={3}
          cursor={"pointer"}
          onClick={() => {
            navigate("/admin/addinstitute");
          }}
        >
          <AddIcon />
          Add Institute{" "}
        </Flex>
        {/* For manage Students */}
        <Flex
          justifyContent={"center"}
          rounded={"lg"}
          boxShadow={"2xl"}
          alignItems={"center"}
          direction={"column"}
          backgroundColor={"blue.900"}
          p={5}
          m={5}
          fontSize={"2xl"}
          gap={3}
          cursor={"pointer"}
          onClick={() => {
            navigate("/admin/managestudents");
          }}
        >
          <CalendarIcon />
          Manage Students
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Admin;
