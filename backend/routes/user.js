const express = require("express");
const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUsers,
  forgotPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
  updateDetails,
  getInstitutes,
  getInstituteStudents,
  addInstitute,
  addDepartment,
  getDepartments,
  getProfileWithId,
  getAdminAllUsers,
  adminDeleteProfile
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUsers);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/savedata/:id").post(updateDetails);

router.route("/getinstitutes").get(getInstitutes);

//adding institute

router.route("/addinstitute").post(addInstitute);

router.route("/dashboard/:institutecode").get(getInstituteStudents);
//  Department Routes
router.route("/getdepartments").get(getDepartments);
router.route("/adddepartment").post(addDepartment);

router.route("/profile/:id").get(getProfileWithId);

// getting all users
router.route("/admin-getallusers").get(getAdminAllUsers);

// deleteprofile
router.route("/deleteprofile/:id").post(adminDeleteProfile);

module.exports = router;
