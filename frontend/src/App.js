import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import NotFound from "./Components/NotFound/NotFound";
import { InstituteContext } from "./Content/InstituteContext";
import Dashboard from "./Components/dashboard";
import ShowUserInputModel from "./Components/ShowUserInputModel/ShowUserInputModel";
import AboutUs from "./Components/Aboutus";
import Profile from "./Components/profile";
import { useContext } from "react";
import Admin from "./Components/Admin/Admin";
import AddInstitute from "./Components/Admin/AddInstitute";
import ManageStudents from "./Components/Admin/ManageStudents";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isAdmin } = useContext(InstituteContext);

  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <ShowUserInputModel /> : <Register />}
        />

        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />

        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />

        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
        />

        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
        />

        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Login />}
        />
        <Route
          path="/dashboard/:institutecode"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />

        <Route
          path="/aboutus"
          element={isAuthenticated ? <AboutUs /> : <Login />}
        />

        <Route
          path="/profile/:id"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        <Route
          path="/adddetails"
          element={isAuthenticated ? <ShowUserInputModel /> : <Login />}
        />

        <Route path="search" element={<Search />} />

        {/* Admin */}
        <Route
          path="/admin/"
          element={isAdmin && isAuthenticated ? <Admin /> : <Login />}
        />
        <Route
          path="/admin/addinstitute"
          element={isAdmin && isAuthenticated ? <AddInstitute /> : <Login />}
        />
        <Route
          path="/admin/managestudents"
          element={isAdmin && isAuthenticated ? <ManageStudents /> : <Login />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
