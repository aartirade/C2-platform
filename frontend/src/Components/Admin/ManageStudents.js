import React, { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  InputGroup,
  InputAddon,
  InputRightElement,
  Input,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search2Icon, DeleteIcon } from "@chakra-ui/icons";
const ManageStudents = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    await axios
      .get("/api/v1/admin-getallusers")
      .then((res) => {
        console.log("users", res);
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredUsers(users);
      return;
    }
    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredUsers(filteredUsers);
  }, [searchText]);

  return (
    <>
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <>
          <Flex
            direction={"column"}
            justifyContent={"center"}
            gap={8}
            alignItems={"center"}
            w={"full"}
            p={12}
          >
            {/* First */}

            <Flex>
              <Heading color="white">Admin Dashboard</Heading>
            </Flex>

            {/* Mid */}
            <Flex
              backgroundColor={"white"}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              gap={8}
              w={"full"}
              p={8}
              rounded={"lg"}
            >
              <InputGroup size="lg">
                <Input
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  pr="4.5rem"
                  type="text"
                  placeholder="Search Students"
                />
                <InputRightElement width="4.5rem">
                  <Search2Icon />
                </InputRightElement>
              </InputGroup>

              {/* Table */}
              <TableContainer width={"full"}>
                <Table variant="simple">
                  <TableCaption>Student Data</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredUsers.map((user, key) => (
                      <Tr key={key}>
                        <Td>{key + 1}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          <DeleteIcon cursor={"pointer"} color={"red.500"} />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>

            {/* Table */}

            <Button
              backgroundColor={"red.500"}
              onClick={() => {
                navigate("/admin");
              }}
              color={"white"}
            >
              Back
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};

export default ManageStudents;
