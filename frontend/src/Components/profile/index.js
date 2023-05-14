import React from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { profileData } from "../../data/data";
import { StudentData } from "../../data/data";
import ProfileInfo1 from "./ProfileInfo1";
import Linkedin from "./Linkedin";
import Coding from "./Coding";
import ProfileInfo2 from "./ProfileInfo2";
import IconLinks from "./IconLinks";

const Profile = () => {
  return (
    <Container maxW="container.2xl">
      <Flex direction={{ base: "column" }}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={5}
          color={"whiteAlpha.900"}
          p="4"
          justifyContent={"space-evenly"}
          flex={1}
        >
          {" "}
          <Flex flex={1} direction={"column"}>
            <ProfileInfo1 />
            <IconLinks />
          </Flex>
          <ProfileInfo2 data={profileData} />
          {/* These are email icons and github links */}
        </Stack>

        <Divider mt={6} />
        <Heading py={9} color={"whiteAlpha.900"} textAlign={"center"}>
          {" "}
          Your Accomplishments{" "}
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          color={"whiteAlpha.900"}
          spacing={10}
          p="4"
        >
          {/* GThis is Coding UI */}
          <Coding />
          {/* This is Linked in data UI */}
          <Divider
            display={{ base: "block", md: "none" }}
            orientation={"horizontal"}
          />
          {/* <Divider
            display={{ base: "none", md: "block" }}
            orientation={"vertical"}
          /> */}

          <Linkedin />
        </Stack>
      </Flex>
    </Container>
  );
};

export default Profile;
