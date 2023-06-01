import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const InstituteContext = createContext("");

const InstituteProvider = ({ children }) => {
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/v1/getinstitutes").then((res) => {
        setInstitutes(res.data.institute);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/v1/getdepartments").then((res) => {
        setDepartments(res.data.departments);
      });
    };
    fetchData();
  }, []);

  return (
    <InstituteContext.Provider
      value={{ setIsAdmin, isAdmin, institutes, departments, setInstitutes }}
    >
      {children}
    </InstituteContext.Provider>
  );
};

const withInstitute = (Child) => (props) =>
  (
    <InstituteContext.Consumer>
      {(context) => <Child {...props} {...context} />}
      {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
    </InstituteContext.Consumer>
  );

export { InstituteProvider, withInstitute };
