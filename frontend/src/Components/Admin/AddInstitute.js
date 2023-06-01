import React, { useState } from "react";
import {
  Flex,
  Input,
  Icon,
  Button,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddInstitute = () => {
  const [instituteData, setInstituteData] = useState({
    instituteName: "",
    instituteCode: 0,
    student: [],
  });

  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  //   Post Data to backend
  const handleSubmit = async () => {
    if (
      instituteData.instituteName === "" ||
      instituteData.instituteCode === 0
    ) {
      return;
    }
    setLoading(true);
    await axios
      .post("/api/v1/addinstitute", {
        institute_name: instituteData.instituteName,
        instituteCode: instituteData.instituteCode,
        student: instituteData.student,
      })
      .then((res) => {
        console.log("res", res);
        toast({
          title: "Institute Added.",
          description: "We've added your institute for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/admin");
        }, 3000);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        toast({
          title: "Some error occured.",
          description: "Instuite not added.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

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
            width={"full"}
            gap={4}
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
          >
            <Flex
              direction={"column"}
              m={12}
              p={12}
              justifyContent={"center"}
              alignItems={"center"}
              w={"2xl"}
              gap={8}
              backgroundColor={"white"}
            >
              <Heading>Add Institute</Heading>
              <Input
                placeholder="Institute Code"
                onClick={(e) => {
                  setInstituteData({
                    ...instituteData,
                    instituteCode: parseInt(e.target.value),
                  });
                }}
              />
              <Input
                placeholder="Institute Name"
                onClick={(e) => {
                  setInstituteData({
                    ...instituteData,
                    instituteName: e.target.value,
                  });
                }}
              />
              <Button
                color={"white"}
                backgroundColor={"blue.400"}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Flex>
            <Button
              backgroundColor={"red.600"}
              onClick={() => {
                navigate("/admin");
              }}
              color={"white"}
            >
              Back
            </Button>
          </Flex>
        </>
      )}{" "}
    </>
  );
};

export default AddInstitute;
