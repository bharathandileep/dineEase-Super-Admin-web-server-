import { APICore, axiosInstance } from "../../helpers/api/apiCore";
import { apiConfig } from "../../helpers/api/apis";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../firebase.config";

interface UserData {
  username: string;
  password: string;
}

const api = new APICore();

export const AuthAdminCredentials = async (adminCredentials: UserData) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.admin.login}`,
      adminCredentials
    );
    // localStorage.setItem("token", response.data.data.token);
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    // throw error;
  }
};

export const googleAuth = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, provider);
    const {
      user: { displayName, photoURL, email },
    } = result;
    const token = await result.user.getIdToken();
    const response = await axiosInstance.post(
      "/auth/google-auth",
      {
        displayName,
        photoURL,
        email,
      },
      {
        headers: {
          Google_authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    api.setLoggedInUser(response.data.data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const authUserWithCredentials = async (userCredentials: any) => {
  try {
    const response = await axiosInstance.post(
      "/auth/send-otp",
      userCredentials
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const authvaliadateOTP = async (userCredentials: any) => {
  try {
    const response = await axiosInstance.post(
      "/auth/verify-otp",
      userCredentials
    );
    api.setLoggedInUser(response.data.data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUserWithMail = async (userCredentials: any) => {
  try {
    console.log(userCredentials);
    const response = await axiosInstance.post(
      "/auth/login-Otp",
      userCredentials
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginOTPVerify = async (userCredentials: any) => {
  try {
    console.log(userCredentials);
    const response = await axiosInstance.post(
      "/auth/verify-loginotp",
      userCredentials
    );
    api.setLoggedInUser(response.data.data);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
