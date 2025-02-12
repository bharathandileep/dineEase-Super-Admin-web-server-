import {axiosInstance} from "../../helpers/api/apiCore";
import { apiConfig } from "../../helpers/api/apis";

interface UserData {
  userName: string;
  password: string;
}
export const AuthAdminCredentials = async (adminCredentials: UserData) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.admin.login}`,
      adminCredentials
    );
    localStorage.setItem("token", response.data.data.token);
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    // throw error;
  }
};
 