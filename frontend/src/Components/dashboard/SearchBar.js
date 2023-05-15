import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
const SearchBar = ({ name, data, setData, instituteData }) => {
  return (
    <>
      <InputGroup flex={1}>
        <Input
          onChange={(e) => {
            setData(
              instituteData.student.filter((student) => {
                return student.institute.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase());
              })
            );
          }}
          color={"black"}
          variant="filled"
          _focus={{ bg: "white", _placeholder: { color: "grey.400" } }}
          placeholder={"Search By Name"}
        />
        <InputRightElement children={<SearchIcon />} />
      </InputGroup>
    </>
  );
};

export default SearchBar;
