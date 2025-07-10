import { createUser, loginUser } from "../../src/services/user-services.js";

export const renderLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  return res.render("auth/login", {
    title: "Login",
    errorMessage: "",
    user: "",
  });
};

export const renderSignUp = (req, res) => {
  return res.render("auth/signup", {
    title: "Sign Up",
    errorMessage: "",
    user: "",
  });
};

export const registerController = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  try {
    await createUser(username, email, password, password2);
    return res.redirect("/auth/login");
  } catch (error) {
    console.error("Error in registerController:", error);
    res.render("auth/signup", {
      title: "Sign Up",
      errorMessage: error.message || "An unknown error occurred",
      user: null,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    if (token) {
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      return res.redirect("/");
    }
  } catch (error) {
    console.log("Error while logging in", error);
    return res.render("auth/login", {
      title: "Login",
      errorMessage: error.message || "An unknown error occurred",
      user: null,
    });
  }
};

export const logOutController = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};