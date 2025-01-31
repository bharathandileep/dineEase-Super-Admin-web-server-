
 

import axios from "axios"; // Make sure to import axios
//import { API } from "../api/axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API's base URL
 
});

export const createKitchen = async (kitchenData: any) => {
  try {
    const response = await API.post("/kitchens", kitchenData);
    console.log("Kitchen created successfully:", response.data); 
    return response.data; 
  } catch (error:any) {
     console.error("Error response data:", error.response?.data);
  }}


export const getKitchens = async () => {
  try {
    console.log("Making API call...");
    const response = await axios.get("http://localhost:5000/api/kitchens"); 
    return response;
  } catch (error: any) {
    console.error("Error fetching kitchenssss:", error.response?.data || error.message);
    return  error.response ;
  }
};



  





export const getKitchenById = async (kitchenId: any) => {
  try {
    const response = await API.get(`/kitchens/${kitchenId}`,);
    console.log("Kitchen updated successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error updating kitchen");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while updating the kitchen");
    }
  }
};



// // Update an existing kitchen
export const updateKitchen = async (kitchenId: any, updatedData: any) => {
  try {
    const response = await API.put(`/kitchens/${kitchenId}`, updatedData);
    console.log("Kitchen updated successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error updating kitchen");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while updating the kitchen");
    }
  }
};

// // Delete a kitchen (soft delete)
export const deleteKitchen = async (kitchenId: string) => {
  try {
    const response = await API.delete(`/kitchens/${kitchenId}`);
    console.log("Kitchen deleted successfully");
    return response.status === 204; // Return true if successfully deleted
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error response data:", error.response?.data);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
      throw new Error(error.response?.data?.message || "Error deleting kitchen");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while deleting the kitchen");
    }
  }
};



