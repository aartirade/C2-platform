import React from "react";
import { Divider } from "@chakra-ui/react";
import {
  VStack,
  Image,
  Heading,
  HStack,
  Badge,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";

const Linkedin = ({ user }) => {
  return (
    <Flex flex={1} gap={"20px"} direction={{ base: "column" }}>
      <Box rounded={"md"} background={"blue.800"} p={8}>
        <Heading fontSize={"2xl"} textAlign={"center"}>
          {" "}
          Linkedin Participation{" "}
        </Heading>
      </Box>
      <Flex gap={4}>
        {" "}
        <Flex
          alignItems={"flex-start"}
          flex={1}
          rounded={"md"}
          backgroundColor={"purple.700"}
          p={4}
        >
          <Heading fontSize={"lg"}> Certifications - 2 </Heading>
        </Flex>
        <Flex
          alignItems={"flex-start"}
          flex={1}
          rounded={"md"}
          backgroundColor={"purple.700"}
          p={4}
        >
          <Heading fontSize={"lg"}> Experiences - 2 </Heading>
        </Flex>
      </Flex>

      <Box rounded={"md"} background={"blue.800"} p={8}>
        <Heading fontSize={"2xl"} textAlign={"center"}>
          {" "}
          GitHub Contribution{" "}
        </Heading>
      </Box>
      <Flex gap={4}>
        {" "}
        <Flex
          alignItems={"flex-start"}
          flex={1}
          rounded={"md"}
          backgroundColor={"purple.500"}
          p={4}
        >
          <Heading fontSize={"lg"}>
            {" "}
            Public Repo - {user.github_public_repos}{" "}
          </Heading>
        </Flex>
        <Flex
          alignItems={"flex-start"}
          flex={1}
          rounded={"md"}
          backgroundColor={"purple.400"}
          p={4}
        >
          <Heading fontSize={"lg"}>
            {" "}
            Total {user.github_commit_count} Commits in 2023{" "}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Linkedin;
