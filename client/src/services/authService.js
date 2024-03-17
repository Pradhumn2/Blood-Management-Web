import { userLogin } from '../redux/features/auth/authActions';
import store from '../redux/store'

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!email || !password || !role) {
      return alert("Please provide all fields");
    }
    store.dispatch(userLogin({email, password, role}));
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
    if (
      !name ||
      !role ||
      !email ||
      !password ||
      !organisationName ||
      !phone ||
      !address ||
      !website ||
      !hospitalName
    ) {
      return alert("Please provide all fields");
    }
    console.log(
      "register",
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
    );
  } catch (error) {
    console.log(error);
  }
};
