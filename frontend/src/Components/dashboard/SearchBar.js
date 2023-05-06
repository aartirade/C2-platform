import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
const SearchBar = ({ name }) => {
  return (
    <>
      <InputGroup flex={1}>
        <Input color={"black"} variant="filled" placeholder={name} />
        <InputRightElement children={<SearchIcon />} />
      </InputGroup>
    </>
  );
};

export default SearchBar;
