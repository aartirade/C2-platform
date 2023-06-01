import React from "react";
import { Flex, Heading, Icon, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Actions/User";
import {
  PhoneIcon,
  AddIcon,
  CalendarIcon,
  WarningIcon,
} from "@chakra-ui/icons";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
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
      <Button onClick={logoutHandler} backgroundColor="red.500" color="white">
        Logout
      </Button>
    </Flex>
  );
};

export default Admin;
