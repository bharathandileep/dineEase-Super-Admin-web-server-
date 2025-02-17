import { axiosInstance } from "../../helpers/api/apiCore";
import { apiConfig } from "../../helpers/api/apis";

export const getKitchenMenus = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.kitchenMenu.getKitchenMenu(id)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};

export const removeKitchenMenus = async (
  item: string | undefined,
  kitchenId: string | undefined
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.kitchenMenu.removekitchenMenu(item, kitchenId)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};

export const createNewkitchenMenu = async (
  id: string | undefined,
  kitchenData: any
) => {
  try {
    const response = await axiosInstance.post(
      `${apiConfig.kitchenMenu.createkitchenMenu(id)}`,
      kitchenData
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};

export const getKitchenMenuItemDetails = async (
  kitchenId: string | undefined,
  itemId: string | undefined
) => {
  try {
    const response = await axiosInstance.get(
      `${apiConfig.kitchenMenu.kitchenMenuItemChange(kitchenId, itemId)}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};
export const updateKitchenMenuItemDetails = async (
  kitchenId: string | undefined,
  itemId: string | undefined,
  itemUpdateDetails: any
) => {
  try {
    const response = await axiosInstance.put(
      `${apiConfig.kitchenMenu.kitchenMenuItemChange(kitchenId, itemId)}`,
      itemUpdateDetails
    );
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    return error.response;
  }
};
