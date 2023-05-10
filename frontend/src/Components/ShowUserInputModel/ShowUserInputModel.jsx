import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Flex,
  useToast,
  Input,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";

const ShowUserInputModel = () => {
  const toast = useToast();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [userImpData, setUserImpData] = useState({
    prn: "",
    instituteCode: "",
    gfgProfile: "",
    leetcodeProfile: "",
    hackerRankProfile: "",
    linkedProfile: "",
    githubProfile: "",
  });

  const handleSubmit = () => {
    console.log("mydata", user._id);
    axios
      .post(
        `/api/v1/savedata/${user._id}`,
        { userImpData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast({
          title: "Details added",
          description: "We've added your details for you",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        history.push("/home");
      })
      .catch((err) => {
        toast({
          title: "Failed to add details",
          description: "lease Try submitting again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      p={10}
      m={10}
      gap={3}
      justifyContent={"center"}
      direction={"column"}
      alignItems={"center"}
      backgroundColor={"white"}
    >
      {/* Heading */}
      <Flex
        m={4}
        gap={3}
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
      >
        <Heading fontSize={"2xl"}>Enter Your Details</Heading>
        <Text as="p" color={"white.100"}>
          {" "}
          These will help us get data from you. It's a one time process{" "}
        </Text>
      </Flex>

      <Flex
        gap={3}
        justifyContent={"center"}
        direction={"row"}
        alignItems={"center"}
        width={"100%"}
      >
        <FormControl isRequired>
          <FormLabel>Prn Number</FormLabel>

          <Input
            onChange={(e) => {
              setUserImpData({ ...userImpData, prn: e.target.value });
            }}
            placeholder="Ex.7214554K"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Institute code</FormLabel>
          <Input
            onChange={(e) => {
              setUserImpData({ ...userImpData, instituteCode: e.target.value });
            }}
            placeholder="Ex.19201"
          />{" "}
          {/*  this will be a dropdown */}
        </FormControl>
      </Flex>
      <Flex
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
        gap={3}
        width={"100%"}
      >
        <FormControl isRequired>
          <FormLabel>Gfg Profile</FormLabel>
          <Input
            onChange={(e) => {
              setUserImpData({ ...userImpData, gfgProfile: e.target.value });
            }}
            placeholder="https://auth.geeksforgeeks.org/user/user_name"
          />{" "}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Leetcode profile</FormLabel>
          <Input
            onChange={(e) => {
              setUserImpData({
                ...userImpData,
                leetcodeProfile: e.target.value,
              });
            }}
            placeholder="https://leetcode.com/user_name"
          />{" "}
        </FormControl>

        <FormControl>
          <FormLabel>HackerRank profile</FormLabel>
          <Input
            onChange={(e) => {
              setUserImpData({
                ...userImpData,
                hackerRankProfile: e.target.value,
              });
            }}
            placeholder="https://www.hackerrank.com/user_name"
          />{" "}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Linked profile</FormLabel>
          <Input
            onChange={(e) => {
              setUserImpData({
                ...userImpData,
                linkedProfile: e.target.value,
              });
            }}
            placeholder="https://www.linkedin.com/in/user_name"
          />{" "}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Github Profile</FormLabel>
          <Input
            onChange={(e) => {
              setUserImpData({
                ...userImpData,
                githubProfile: e.target.value,
              });
            }}
            placeholder="https://github.com/user_name"
          />{" "}
        </FormControl>
      </Flex>

      <Button
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
        color="white"
        backgroundColor={"blue.400"}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default ShowUserInputModel;
