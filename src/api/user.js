import axiosInstance from "./axios";

export const getUserProfile = async () => {
  const res = await axiosInstance.get("/users/profile");
  return res.data;
};

export const updateUserProfile = async (data) => {
  const res = await axiosInstance.put("/users/profile", data);
  return res.data;
};
