import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Flex,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { profileData } from "../../data/data";
import { StudentData } from "../../data/data";
import ProfileInfo1 from "./ProfileInfo1";
import Linkedin from "./Linkedin";
import Coding from "./Coding";
import ProfileInfo2 from "./ProfileInfo2";
import IconLinks from "./IconLinks";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  console.log("id", id);
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  const getProfileDetails = async () => {
    await axios
      .get(`/api/v1/profile/${id}`)
      .then((res) => {
        const { user } = res.data;
        setUserData(user[0]);
      })
      .catch((err) => {
        console.log("Error occured while fetching", err);
      });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    console.log("data", userData);
  }, [userData]);
  return (
    <>
      {userData === null ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </>
      ) : (
        <>
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
                  <ProfileInfo1 user={userData} />
                  <IconLinks user={userData} />
                </Flex>
                <ProfileInfo2 user={userData} />
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
                <Coding user={userData} />
                {/* This is Linked in data UI */}
                <Divider
                  display={{ base: "block", md: "none" }}
                  orientation={"horizontal"}
                />
                {/* <Divider
            display={{ base: "none", md: "block" }}
            orientation={"vertical"}
          /> */}

                <Linkedin user={userData} />
              </Stack>
            </Flex>
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;
