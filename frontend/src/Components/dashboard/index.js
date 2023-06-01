import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Stack,
  Flex,
  Heading,
  HStack,
  useToast,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Ranking from "./Ranking";

const Dashboard = () => {
  const toast = useToast();
  const [instituteData, setInstituteData] = useState({});
  const { user } = useSelector((state) => state.user);
  console.log("user", user);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/v1/dashboard/${user.instituteCode}`)
        .then((res) => {
          const { data } = res;
          console.log("insdata", data.institutes[0]);
          let final_data = data.institutes[0];
          // // sorting logic
          let objectsArray = data.institutes[0].student;
          const compareByOverallScore = (a, b) => {
            if (a.institute.overall_score > b.institute.overall_score) {
              return -1;
            } else if (a.institute.overall_score < b.institute.overall_score) {
              return 1;
            }
            return 0;
          };
          objectsArray.sort(compareByOverallScore);
          final_data.student = objectsArray;
          setInstituteData(final_data);
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Error",
            description: err,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    };

    getData();
  }, []);

  useEffect(() => {
    console.log("instituteData", instituteData);
  }, [instituteData]);

  return (
    <>
      {Object.keys(instituteData).length === 0 ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />{" "}
        </>
      ) : (
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
                  {instituteData.institute_name}
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
                      Total Students :{" "}
                      {instituteData.student ? instituteData.student.length : 0}
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
                      Total Students : 22
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
                      Total Students : 22
                    </Text>
                  </Box>
                </HStack>
              </Stack>
            </Stack>

            <Ranking instituteData={instituteData} />
          </Flex>
        </>
      )}
    </>
  );
};

export default Dashboard;
