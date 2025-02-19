import {axiosInstance} from "../../helpers/api/apiCore";
import { apiConfig } from "../../helpers/api/apis";

interface UserData {
  username: string;
  password: string;
}
interface ForgotPasswordData {
  email: string;
}

interface VerifyOtpData {
  email: string;
  otp: string;
  token: string;
}

interface UpdatePasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
}
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
export const generateForgotPasswordOtp = async (emailData: ForgotPasswordData) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.admin.generateForgotOtp}`,
      emailData
    );
    return response.data;
  } catch (error: any) {
    console.error("Forgot Password OTP Error:", error.response?.data || error.message);
    throw error;
  }
};

export const verifyForgotPasswordOtp = async (otpData: VerifyOtpData) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.admin.verifyForgotOtp}`,
      otpData
    );
    return response.data;
  } catch (error: any) {
    console.error("Verify OTP Error:", error.response?.data || error.message);
    throw error;
  }
}


export const updateAdminPassword = async (passwordData: UpdatePasswordData) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.admin.updatePassword}`,
      passwordData
    );
    return response.data;
  } catch (error: any) {
    console.error("Update Password Error:", error.response?.data || error.message);
    throw error;
  }
};