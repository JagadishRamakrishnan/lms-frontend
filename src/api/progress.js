import axiosInstance from "./axios";

export const getCourseProgress = async (courseId) => {
  const res = await axiosInstance.get(`/progress/${courseId}`);
  return res.data;
};

export const markLectureComplete = async (courseId, lectureId) => {
  const res = await axiosInstance.post("/progress", { courseId, lectureId });
  return res.data;
};
