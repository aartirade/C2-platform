import React from "react";
import { Container, Box, Heading, Text, Flex } from "@chakra-ui/react";
import { DiReact } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { TbBrandNextjs } from "react-icons/tb";
import UserCard from "./UserCard";
import { SiChakraui } from "react-icons/si";
// import { AboutUsData } from "../../../data/AboutUsData";
import { AboutUsData } from "../../data/AboutUsData";
const AboutUs = () => {
  return (
    <Flex
      mt={16}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"whiteAlpha.900"}
      mx={{ base: 6, md: 12 }}
    >
      <Heading
        bgClip="text"
        bgGradient="linear(to-b, #A7DCE1,#D9EFF2)"
        as={"h1"}
        fontSize={"6xl"}
        my={9}
      >
        {" "}
        About Us{" "}
      </Heading>
      <Text
        textAlign={"center"}
        fontSize={"xl"}
        my={7}
        maxW={"800px"}
        as={"h2"}
        fontWeight={"bold"}
      >
        We build C2 Platform to help students get qualified for Campus
        Placements
      </Text>

      <Text textAlign={"center"} my={3} maxW={"800px"} as={"h3"}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia animi
        quidem sit quasi labore fugit, expedita numquam in facilis repellat
        voluptas aliquid culpa tempora eius natus assumenda itaque earum
        ratione!
      </Text>
      <Text textAlign={"center"} my={3} maxW={"800px"} as={"h3"}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ducimus,
        ut aut optio magnam, consequatur nihil beatae sequi blanditiis,
        laboriosam nam! Nulla nisi illum hic. Perferendis modi quod eum
        inventore!
      </Text>
      <Text
        textAlign={"center"}
        fontSize={"xl"}
        my={7}
        maxW={"800px"}
        as={"h2"}
        fontWeight={"bold"}
      >
        Built Using
        <Flex mt={5} gap={5}>
          <Box
            p={3}
            backgroundColor={"blue.800"}
            rounded={"lg"}
            boxShadow={"lg"}
            color={"whiteAlpha.900"}
          >
            {" "}
            <DiReact size={"3rem"} />{" "}
          </Box>
          <Box
            p={3}
            backgroundColor={"blue.800"}
            rounded={"lg"}
            boxShadow={"lg"}
            color={"whiteAlpha.900"}
          >
            <GrMysql size={"3rem"} />
          </Box>
          <Box
            p={3}
            backgroundColor={"blue.800"}
            rounded={"lg"}
            boxShadow={"lg"}
            color={"whiteAlpha.900"}
          >
            <TbBrandNextjs size={"3rem"} />
          </Box>
          <Box
            p={3}
            backgroundColor={"blue.800"}
            rounded={"lg"}
            boxShadow={"lg"}
            color={"whiteAlpha.900"}
          >
            <SiChakraui size={"3rem"} />
          </Box>
        </Flex>
      </Text>

      <Heading
        bgClip="text"
        bgGradient="linear(to-b, #A7DCE1,#D9EFF2)"
        as={"h1"}
        fontSize={"5xl"}
        mt={9}
        mb={24}
      >
        {" "}
        Our Team{" "}
      </Heading>

      <Flex
        gap={{ base: 28, lg: 12 }}
        direction={{ base: "column", lg: "row" }}
        alignItems={"stretch"}
        mb={12}
      >
        {AboutUsData.map((item) => (
          <UserCard
            name={item.name}
            role={item.role}
            image={item.image}
            instagram={item.instagram}
            github={item.github}
            linkedin={item.linkedin}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default AboutUs;
