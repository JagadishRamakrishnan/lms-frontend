import axiosInstance from "./axios";

export const enrollCourse = async (data) => {
  const res = await axiosInstance.post("/enrollments", data);
  return res.data;
};

export const getMyCourses = async () => {
  const res = await axiosInstance.get("/enrollments/my-courses");
  return res.data;
};

export const checkEnrollment = async (courseId) => {
  const res = await axiosInstance.get(`/enrollments/${courseId}`);
  return res.data;
};
