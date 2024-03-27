import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!email || !password || !role) {
      return alert("Please provide all fields");
    }
    // console.log("handledlogin successfully");
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};
export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  organisationName,
  phone,
  address,
  hospitalName,
  website
) => {
  e.preventDefault();
  try {
    if (role === "donar" || role === "admin") {
      if (
        !name ||
        !role ||
        !email ||
        !password ||
        !phone ||
        !address ||
        !website
      ) {
        return alert("Please provide all the fields");
      }
    } else if (role === "organisation") {
      if (
        !role ||
        !email ||
        !password ||
        !organisationName ||
        !phone ||
        !address ||
        !website
      ) {
        return alert("Please provide all the fields");
      }
    } else {
      if (
        !role ||
        !email ||
        !password ||
        !phone ||
        !address ||
        !hospitalName ||
        !website
      ) {
        return alert("Please provide all the fields");
      }
    }

    //auth service is sep than react comp , that's y we haven't use "useselector" or "usedispatch" for performing action
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        organisationName,
        phone,
        address,
        hospitalName,
        website,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
