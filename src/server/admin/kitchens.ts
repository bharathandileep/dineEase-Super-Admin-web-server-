import axiosInstance from "../../helpers/api/apiCore";
import { apiConfig } from "../../helpers/api/apis";

export const getAllKitches = async () => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.kitchens.getAllkitchens}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};

export const createNewkitchen = async (kitchenData: any) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.kitchens.newkitchens}`,
      kitchenData
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};

export const getkitchenDetails = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.kitchens.getkitchensById(id)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const updatekitchenDetails = async (
  id: string | undefined,
  kitchenDetails: any
) => {
  try {
    const response = await axiosInstance.put(
      `${apiConfig.kitchens.updatekitchens(id)}`,
      kitchenDetails
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};

export const deletekitchenDetails = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.delete(
      `${apiConfig.kitchens.deletekitchens(id)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
};
