import React from "react";
import {
  Box,
  Stack,
  Flex,
  Heading,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import Ranking from "./Ranking";

const Dashboard = () => {
  return (
    <>
      <Flex flexDirection={"column"}>
        <Stack
          direction={["column", "row"]}
          alignItems={"stretch"}
          flexDir={{ base: "column", md: "row" }}
          p={4}
          display={"flex"}
        >
          {" "}
          <Box
            color={"whiteAlpha.200"}
            boxShadow="md"
            rounded="md"
            bg={"blue.800"}
            blur="md"
            p={3}
            flex={{ base: 1, md: 1 }}
          >
            <Heading color={"whiteAlpha.900"} fontSize={"xl"}>
              Student Dashboard
            </Heading>
          </Box>
          <Stack
            color={"whiteAlpha.900"}
            boxShadow="md"
            rounded="md"
            p={3}
            flex={{ base: 1, md: 2 }}
            display={"flex"}
            justifyContent={"flex-start"}
            bg={"blue.800"}
          >
            <Heading fontSize={"md"} mb={{ base: 2, lg: 6 }}>
              <Text fontSize="xs">Institute | </Text>
              Dr. D.Y. Patil Institute of Engineering, Management and Research{" "}
            </Heading>

            <HStack justifyContent={"center"} spacing={4}>
              <Box
                boxShadow={"md"}
                rounded={"md"}
                backgroundColor={"orange.400"}
                p="4"
              >
                <Text color={"whiteAlpha.900"} fontSize="xs">
                  {" "}
                  Total Students : 420
                </Text>
              </Box>
              <Box
                boxShadow={"md"}
                rounded={"md"}
                backgroundColor={"orange.400"}
                p="4"
              >
                <Text color={"whiteAlpha.900"} fontSize="xs">
                  {" "}
                  Total Students : 4201
                </Text>
              </Box>

              <Box
                boxShadow={"md"}
                rounded={"md"}
                backgroundColor={"orange.400"}
                p="4"
              >
                <Text color={"whiteAlpha.900"} fontSize="xs">
                  {" "}
                  Total Students : 420
                </Text>
              </Box>
            </HStack>
          </Stack>
        </Stack>

        <Ranking />
      </Flex>
    </>
  );
};

export default Dashboard;
