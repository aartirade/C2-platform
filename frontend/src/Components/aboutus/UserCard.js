import React from "react";
import { Box, Heading, Image, Flex, Text, Link } from "@chakra-ui/react";
import { FaInstagram, FaLinkedin, FaGithubAlt } from "react-icons/fa";
const UserCard = ({ name, role, instagram, github, image, linkedin }) => {
  return (
    <Box position={"relative"} maxW={"600px"}>
      <Flex
        position={"absolute"}
        justifyContent={"center"}
        alignItems={"center"}
        top={"-60px"}
        left={"27%"}
      >
        {console.log("ola", image)}
        <Image
          borderRadius="full"
          boxSize="120px"
          src={image}
          alt="Dan Abramov"
        />
      </Flex>
      <Flex
        p={14}
        backgroundColor={"blue.800"}
        color={"whiteAlpha.900"}
        rounded={"lg"}
        boxShadow={"xl"}
        direction={"column"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Heading mt={10} display={"block"} as="h2" fontSize={"xl"}>
          {name}
        </Heading>
        <Text
          color={"whiteAlpha.500"}
          display={"block"}
          as="h2"
          fontSize={"md"}
        >
          {role}
        </Text>
        <Flex mt={7} gap={4} justifyContent={"center"} alignItems={"center"}>
          <Link href={instagram} isExternal>
            <FaInstagram cursor={"pointer"} size={"25px"} />{" "}
          </Link>
          <Link href={linkedin} isExternal>
            <FaLinkedin cursor={"pointer"} size={"25px"} />
          </Link>
          <Link href={github} isExternal>
            <FaGithubAlt cursor={"pointer"} size={"25px"} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserCard;
