import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const InstituteContext = createContext("");

const InstituteProvider = ({ children }) => {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api/v1/getinstitutes").then((res) => {
        setInstitutes(res.data.institute);
      });
    };
    fetchData();
  }, []);

  return (
    <InstituteContext.Provider value={{ institutes, setInstitutes }}>
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
