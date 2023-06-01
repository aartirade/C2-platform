import React from "react";

import { Stack, Box, Text } from "@chakra-ui/react";
import { BsLinkedin } from "react-icons/bs";
import { AiOutlineGithub } from "react-icons/ai";
import { MdAttachEmail } from "react-icons/md";
import { Circle, Center, Link } from "@chakra-ui/react";
const IconLinks = ({ user }) => {
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
          <MdAttachEmail fontSize={"25px"} />
          <Link href={`mailto:${user.email}`} isExternal>
            Email
          </Link>
        </Center>
      </Circle>
      <Circle size="90px" bg="gray.800" color="white">
        <Center flexDirection={"column"}>
          <AiOutlineGithub fontSize={"25px"} />{" "}
          <Link href={user.gfgProfile} isExternal>
            Github
          </Link>
        </Center>
      </Circle>
      <Circle size="90px" bg="gray.800" color="white">
        <Center flexDirection={"column"}>
          <BsLinkedin fontSize={"25px"} />
          <Link href={user.linkedProfile} isExternal>
            Linked in 
          </Link>
        </Center>
      </Circle>
    </Stack>
  );
};

export default IconLinks;
