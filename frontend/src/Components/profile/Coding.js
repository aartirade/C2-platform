import React from "react";

import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const Coding = ({ user }) => {
  return (
    <Flex flex={1} gap={"20px"} direction={{ base: "column" }}>
      <Box rounded={"md"} background={"blue.800"} p={8}>
        <Heading fontSize={"2xl"} textAlign={"center"}>
          {" "}
          Problems solved{" "}
        </Heading>
      </Box>
      {/* <></> */}
      <Flex gap={4} justifyContent={"space-between"}>
        {" "}
        <Box flex={1} rounded={"md"} backgroundColor={"green.800"} p={4}>
          <Heading fontSize={"lg"} textAlign={"center"} m={3}>
            {" "}
            GFG - {user.gfg_easy + user.gfg_med + user.gfg_hard}{" "}
          </Heading>

          <Box flex={1} rounded={"md"} backgroundColor={"green.300"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Easy -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.gfg_easy}{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.400"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Medium -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.gfg_med}{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.500"} p={4}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Hard -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.gfg_hard}{" "}
            </Text>{" "}
          </Box>
        </Box>
        <Box flex={1} rounded={"md"} backgroundColor={"yellow.600"} p={4}>
          <Heading fontSize={"lg"} textAlign={"center"} m={3}>
            {" "}
            Hackerrank{" "}
          </Heading>

          <Box flex={1} rounded={"md"} backgroundColor={"yellow.400"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Badges Earned -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.hackerrank_badge_count}{" "}
            </Text>{" "}
          </Box>
        </Box>
        <Box flex={1} rounded={"md"} backgroundColor={"green.700"} p={4}>
          <Heading fontSize={"lg"} textAlign={"center"} m={3}>
            {" "}
            LeetCode - {user.leet_easy + user.leet_med + user.leet_hard}
            {"  "}
          </Heading>

          <Box flex={1} rounded={"md"} backgroundColor={"green.300"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Easy -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.leet_easy}{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.400"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Medium -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.leet_med}{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.500"} p={4}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Hard -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              {user.leet_hard}{" "}
            </Text>{" "}
          </Box>
        </Box>
      </Flex>

      <Box rounded={"md"} backgroundColor={"green.800"} p={4}>
        <Heading fontSize={"lg"} textAlign={"center"}>
          {" "}
          Total Score -{" "}
          {user.leet_easy +
            user.leet_med +
            user.leet_hard +
            user.gfg_easy +
            user.gfg_med +
            user.gfg_hard +
            user.hackerrank_badge_count}{" "}
        </Heading>
      </Box>
    </Flex>
  );
};

export default Coding;
