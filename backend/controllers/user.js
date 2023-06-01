const fetch = require("node-fetch");
const User = require("../models/User");
const Post = require("../models/Post");
const Institute = require("../models/Institute");

const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const Department = require("../models/Department");
const { error } = require("console");

exports.register = async (req, res) => {
  try {
    //const { name, email, password } = req.body; //const { name, email, password, avatar } = req.body;
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.followers.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User Unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // Removing Avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();

    // Logout user after deleting profile

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    // Delete all posts of the user
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    // Removing User from Followers Following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    // Removing User from Following's Followers
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);

      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    // removing all comments of the user from all posts
    const allPosts = await Post.find();

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    // removing all likes of the user from all posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await Post.findById(allPosts[i]._id);

      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  For updating links

exports.updateDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.body);
    //   {  "userImpData":  {
    //   "prn": "7217555K",
    //   "instituteCode": "19201",
    //   "departmentCode":"CS",
    //   "gfgProfile": "https://auth.geeksforgeeks.org/user/omkarjawalkar234",
    //   "leetcodeProfile": "https://leetcode.com/ojawalkar7/",
    //   "hackerRankProfile": "https://www.hackerrank.com/omkarjawalkar234",
    //   "linkedProfile": "https://www.linkedin.com/in/omkar-jawalkar-68b658208/",
    //   "githubProfile": "https://github.com/Omkar-Jawalkar",
    //   "mobile_no" : "9403970664",
    //   "institute_name":"DYPIEMR",
    //   "department_name":"Computer Engineering"
    // }
    //   }

    const {
      prn,
      instituteCode,
      departmentCode,
      gfgProfile,
      leetcodeProfile,
      hackerRankProfile,
      linkedProfile,
      githubProfile,
      mobile_no,
      institute_name,
      department_name,
    } = req.body.userImpData;

    // Extracting the username from the links

    let ans = {};

    function extractUsername(url) {
      let username = null;
      if (url.includes("leetcode.com")) {
        var urlObj = new URL(url);
        username = urlObj.pathname.split("/")[1];
      } else if (url.includes("geeksforgeeks.org")) {
        const urlObj = new URL(url);
        username = urlObj.pathname.split("/")[2];
      } else if (url.includes("practice")) {
        var regex = /org\/([practice]+)/;
        username = url.match(regex)[1];
      } else if (url.includes("linkedin.com")) {
        var regex = /in\/([a-zA-Z0-9_-]+)/;
        username = url.match(regex)[1];
      } else if (url.includes("www.hackerrank.com/profile")) {
        var regex = /profile\/([a-zA-Z0-9_-]+)/;
        username = url.match(regex)[1];
      } else if (url.includes("www.hackerrank.com/")) {
        var urlObj = new URL(url);
        username = urlObj.pathname.split("/")[1];
      } else if (url.includes("github.com")) {
        var urlObj = new URL(url);
        username = urlObj.pathname.split("/")[1];
      }
      return username;
    }

    console.log("good1");
    ans.gfgUser = extractUsername(gfgProfile);
    ans.leetcodeUser = extractUsername(leetcodeProfile);
    ans.hackerrankUser = extractUsername(hackerRankProfile);
    ans.linkedinUser = extractUsername(linkedProfile);
    ans.githubUser = extractUsername(githubProfile);

    const institute = await Institute.find({ instituteCode: instituteCode });
    console.log(institute);
    user.prn_no = prn;
    user.instituteCode = instituteCode;
    user.departmentCode = departmentCode;
    user.gfgProfile = gfgProfile;
    user.leetcodeProfile = leetcodeProfile;
    user.hackerRankProfile = hackerRankProfile;
    user.linkedProfile = linkedProfile;
    user.githubProfile = githubProfile;
    user.mobile_no = mobile_no;
    user.institute_name = institute_name;
    user.department_name = department_name;
    // udpating the institute
    institute[0].student.push({ institute: user._id });
    await institute[0].save();

    console.log("good2");
    console.log(ans);
    const hackerrank = await fetch(
      `https://flask-api-qzzy.onrender.com/hackerrank-badges/${ans.hackerrankUser}`
    );
    console.log("hackdone");
    const gfg = await fetch(
      `https://flask-api-qzzy.onrender.com/geeksforgeeks-data/${ans.gfgUser}`
    );
    console.log("gfg");
    const leetcode = await fetch(
      `https://leetcode-stats-api.herokuapp.com/${ans.leetcodeUser}`
    );
    console.log("leetdone");
    const github = await fetch(
      `https://flask-api-qzzy.onrender.com/github-commits/${ans.githubUser}`
    );
    console.log("githubdone");
    console.log("good3");
    const hackerRankData = await hackerrank.json();
    const gfgData = await gfg.json();
    const leetcodeData = await leetcode.json();
    const githubData = await github.json();

    let over_score = 0;

    // For GFG
    user.gfg_easy = parseInt(gfgData.easy_problems_solved[0]);
    user.gfg_med = parseInt(gfgData.medium_problems_solved[0]);
    user.gfg_hard = parseInt(gfgData.hard_problems_solved[0]);

    over_score += isNaN(user.gfg_easy) ? 0 : user.gfg_easy;
    over_score += isNaN(user.gfg_med) ? 0 : user.gfg_med;
    over_score += isNaN(user.gfg_hard) ? 0 : user.gfg_hard;

    // For Leetcode

    user.leet_easy = leetcodeData.easySolved;
    user.leet_med = leetcodeData.mediumSolved;
    user.leet_hard = leetcodeData.hardSolved;

    over_score += isNaN(user.leet_easy) ? 0 : user.leet_easy;
    over_score += isNaN(user.leet_med) ? 0 : user.leet_med;
    over_score += isNaN(user.leet_hard) ? 0 : user.leet_hard;

    // For Hackerrank

    user.hackerrank_badge_count = hackerRankData.num_badges;
    user.hackerrank_badge_names = hackerRankData.badges;

    over_score += isNaN(user.hackerrank_badge_count);
    // For Github

    user.github_commit_count = githubData.num_commits;
    user.github_public_repos = githubData.public_repos;

    over_score += isNaN(user.github_commit_count)
      ? 0
      : user.github_commit_count;
    over_score += isNaN(user.github_public_repos)
      ? 0
      : user.github_public_repos;

    user.all_links_user_names = ans;

    console.log(ans);
    user.overall_score = over_score;
    console.log("overall_score", user.overall_score);

    await user.save();

    console.log("good4");

    // SSending back response
    res.status(200).json({
      success: true,
      message: "Details Updated",
      user,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Adding Institute

exports.addInstitute = async (req, res) => {
  try {
    const { instituteCode } = req.body;
    const data = await Institute.find({ instituteCode: instituteCode });
    if (data.length > 0) {
      res.status(500).json({
        success: false,
        message: "This Institute Already Exists",
      });
    } else {
      var institute = new Institute(req.body);

      institute.save(function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "institute Added..",
          });
        }
      });
      console.log("hello..", req.body);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// For getting institutes

exports.getInstitutes = async (req, res) => {
  // get institutes
  try {
    const institute = await Institute.find({});
    res.status(200).json({
      success: true,
      message: "Got the data",
      institute,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// For getting institute data

exports.getInstituteStudents = async (req, res) => {
  try {
    const instituteStudent = await Institute.find({
      instituteCode: req.params.institutecode,
    })
      .populate("student.institute")
      .exec((err, institutes) => {
        if (err) {
          console.error(err);
          // Handle the error appropriately
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Got the data",
            institutes,
          });
          // Do something with the retrieved data
        }
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).json({
      success: true,
      message: "Got the data",
      departments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const { departmentCode } = req.body.department;
    const data = await Department.find({ departmentCode: departmentCode });
    if (data.length > 0) {
      res.status(500).json({
        success: false,
        message: "This Department Already Exists",
      });
    } else {
      var department = new Department(req.body.department);

      department.save(function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Department Added..",
          });
        }
      });
      console.log("hello..", req.body);
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// getProfileWithId

exports.getProfileWithId = async (req, res) => {
  try {
    const user = await User.find({ prn_no: req.params.id });
    res.status(200).json({
      success: true,
      message: "Got the data",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAdminAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Got the data",
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete profile from all models

exports.adminDeleteProfile = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    // const posts = user.posts;
    // const followers = user.followers;
    // const following = user.following;
    // const userId = user._id;

    // // Removing Avatar from cloudinary
    // await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    // await user.remove();

    // // Delete all posts of the user
    // for (let i = 0; i < posts.length; i++) {
    //   const post = await Post.findById(posts[i]);
    //   await cloudinary.v2.uploader.destroy(post.image.public_id);
    //   await post.remove();
    // }

    // // Removing User from Followers Following
    // for (let i = 0; i < followers.length; i++) {
    //   const follower = await User.findById(followers[i]);

    //   const index = follower.following.indexOf(userId);
    //   follower.following.splice(index, 1);
    //   await follower.save();
    // }

    // // Removing User from Following's Followers
    // for (let i = 0; i < following.length; i++) {
    //   const follows = await User.findById(following[i]);

    //   const index = follows.followers.indexOf(userId);
    //   follows.followers.splice(index, 1);
    //   await follows.save();
    // }

    // // removing all comments of the user from all posts
    // const allPosts = await Post.find();

    // for (let i = 0; i < allPosts.length; i++) {
    //   const post = await Post.findById(allPosts[i]._id);

    //   for (let j = 0; j < post.comments.length; j++) {
    //     if (post.comments[j].user === userId) {
    //       post.comments.splice(j, 1);
    //     }
    //   }
    //   await post.save();
    // }
    // // removing all likes of the user from all posts

    // for (let i = 0; i < allPosts.length; i++) {
    //   const post = await Post.findById(allPosts[i]._id);

    //   for (let j = 0; j < post.likes.length; j++) {
    //     if (post.likes[j] === userId) {
    //       post.likes.splice(j, 1);
    //     }
    //   }
    //   await post.save();
    // }
    let data;
    await Institute.updateOne(
      { "student.institute": req.params.id },
      { $pull: { student: { institute: req.params.id } } },
      (err, result) => {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log("Institute deleted successfully:", result);
        }
      }
    );
    res.status(200).json({
      success: true,
      student: data,
      user: user,
    });
    console.log(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
