import React from "react";

import { Flex, Box, Heading, Text } from "@chakra-ui/react";
const Coding = () => {
  return (
    <Flex flex={1} gap={"20px"} direction={{ base: "column" }}>
      <Box rounded={"md"} background={"blue.800"} p={8}>
        <Heading fontSize={"2xl"} textAlign={"center"}>
          {" "}
          No of problems solved{" "}
        </Heading>
      </Box>
      {/* <></> */}
      <Flex gap={4} justifyContent={"space-between"}>
        {" "}
        <Box flex={1} rounded={"md"} backgroundColor={"green.800"} p={4}>
          <Heading fontSize={"lg"} textAlign={"center"} m={3}>
            {" "}
            GFG - 89{" "}
          </Heading>

          <Box flex={1} rounded={"md"} backgroundColor={"green.300"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Easy -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              43{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.400"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Medium -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              21{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.500"} p={4}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Hard -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              12{" "}
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
              6{" "}
            </Text>{" "}
          </Box>
        </Box>
        <Box flex={1} rounded={"md"} backgroundColor={"green.700"} p={4}>
          <Heading fontSize={"lg"} textAlign={"center"} m={3}>
            {" "}
            LeetCode - 79{" "}
          </Heading>

          <Box flex={1} rounded={"md"} backgroundColor={"green.300"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Easy -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              49{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.400"} p={3}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Medium -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              11{" "}
            </Text>{" "}
          </Box>

          <Box flex={1} rounded={"md"} backgroundColor={"green.500"} p={4}>
            <Heading display={"inline"} fontSize={"md"}>
              {" "}
              Hard -
            </Heading>
            <Text display={"inline"} fontSize={"md"}>
              {" "}
              2{" "}
            </Text>{" "}
          </Box>
        </Box>
      </Flex>

      <Box rounded={"md"} backgroundColor={"green.800"} p={4}>
        <Heading fontSize={"lg"} textAlign={"center"}>
          {" "}
          Total Score - 205{" "}
        </Heading>
      </Box>
    </Flex>
  );
};

export default Coding;
