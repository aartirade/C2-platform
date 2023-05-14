import React from "react";

import { Stack, Box, Text } from "@chakra-ui/react";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineGithub } from "react-icons/ai";
import { MdAttachEmail } from "react-icons/md";
import { Circle, Center } from "@chakra-ui/react";
const IconLinks = () => {
  return (
    <Stack
      direction={{ base: "row" }}
      justifyContent={"space-evenly"}
      spacing={5}
      color={"whiteAlpha.900"}
      p="4"
      textAlign={"center"}
    >
      {" "}
      <Circle size="90px" bg="gray.800" color="white">
        <Center flexDirection={"column"}>
          <MdAttachEmail fontSize={"25px"} /> <Text>Email </Text>
        </Center>
      </Circle>
      <Circle size="90px" bg="gray.800" color="white">
        <Center flexDirection={"column"}>
          <AiOutlineGithub fontSize={"25px"} /> <Text>Github </Text>
        </Center>
      </Circle>
      <Circle size="90px" bg="gray.800" color="white">
        <Center flexDirection={"column"}>
          <BsLinkedin fontSize={"25px"} /> <Text>Linkedin </Text>
        </Center>
      </Circle>
    </Stack>
  );
};

export default IconLinks;
