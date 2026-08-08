import axiosInstance from "./axios";

export const createPaymentOrder = async (courseId) => {
  const res = await axiosInstance.post("/payment/create-order", { courseId });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axiosInstance.post("/payment/verify", data);
  return res.data;
};
