import React from "react";
import {
  VStack,
  Image,
  Heading,
  HStack,
  Badge,
  Flex,
  Text,
} from "@chakra-ui/react";

const ProfileInfo2 = ({ user }) => {
  return (
    <Flex
      boxShadow={"md"}
      rounded={"xl"}
      backgroundColor={"blue.800"}
      flex={2}
      p={10}
      direction="column"
    >
      <Flex justifyContent={"space-between"} alignItems={"start"} spacing={4}>
        {" "}
        <Heading whiteSpace={"nowrap"} fontWeight={"bold"} fontSize={"2xl"}>
          {" "}
          Institute :
        </Heading>
        <Text
          as="ins"
          cursor={"pointer"}
          fontSize="lg"
          justifyContent={"flex-end"}
        >
          {" "}
          {user.institute_name}{" "}
        </Text>
      </Flex>

      <Flex justifyContent={"space-between"} alignItems={"start"} spacing={4}>
        {" "}
        <Heading whiteSpace={"nowrap"} fontWeight={"bold"} fontSize={"2xl"}>
          {" "}
          Department :
        </Heading>
        <Text
          as="ins"
          cursor={"pointer"}
          fontSize="lg"
          justifyContent={"flex-end"}
        >
          {" "}
          {user.department_name}{" "}
        </Text>
      </Flex>

      <Flex justifyContent={"space-between"} alignItems={"start"} spacing={4}>
        {" "}
        <Heading whiteSpace={"nowrap"} fontWeight={"bold"} fontSize={"2xl"}>
          {" "}
          PRN No :
        </Heading>
        <Text cursor={"pointer"} fontSize="lg">
          {" "}
          {user.prn_no}{" "}
        </Text>
      </Flex>
      <Flex justifyContent={"space-between"} alignItems={"start"} spacing={4}>
        {" "}
        <Heading whiteSpace={"nowrap"} fontWeight={"bold"} fontSize={"2xl"}>
          {" "}
          Mobile :
        </Heading>
        <Text as="ins" cursor={"pointer"} fontSize="lg">
          {" "}
          {user.mobile_no}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProfileInfo2;
