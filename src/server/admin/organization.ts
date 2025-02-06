import axiosInstance from "../../helpers/api/apiCore";
import { apiConfig } from "../../helpers/api/apis";

export const getAllOrg = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.organization.getAllOrganization}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};

export const createNewOrg = async (orgData: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.organization.newOrganization}`,
      orgData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const getOrgDetails = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.organization.getOrganizationById(id)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const updateOrgDetails = async (
  id: string | undefined,
  orgDetails: any
) => {
  try {
    const response = await axiosInstance.put(
      `${apiConfig.organization.updateOrganization(id)}`,
      orgDetails
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};
export const deleteOrgDetails = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConfig.organization.deleteOrganization(id)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};
