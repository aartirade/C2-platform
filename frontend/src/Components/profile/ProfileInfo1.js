import React from "react";
import { VStack, Image, Heading, HStack, Badge, Flex } from "@chakra-ui/react";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "@mui/icons-material";
import { Link } from "react-router-dom";
const ProfileInfo1 = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <VStack m={1} spacing={4}>
      <Image
        borderRadius="full"
        boxSize="120px"
        // src="https://bit.ly/dan-abramov"
        src={user.avatar.url}
        alt="Dan Abramov"
      />

      <Heading mt={2} as={"h4"} size="md">
        {user.name}
      </Heading>

      <Badge variant="solid" color={"black"} backgroundColor={"#FFD700"}>
        Ranked #1
      </Badge>
    </VStack>
  );
};

export default ProfileInfo1;
