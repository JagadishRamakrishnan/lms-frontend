import axiosInstance from "./axios";

export const getCourses = async (params = {}) => {
  const res = await axiosInstance.get("/courses", { params });
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await axiosInstance.get(`/courses/${id}`);
  return res.data;
};
