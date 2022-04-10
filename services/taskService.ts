import axios from "../utils/axiosInstance";
import asyncHandler from "../utils/asyncHandler";

//Tasks Endpoints
export const getActiveTasks = asyncHandler(
  async () => await axios.get(`/tasks`),
);
export const getActiveTask = asyncHandler(
  async (id: number) => await axios.get(`/tasks/${id}`),
);
export const createTask = asyncHandler(
  async (data: Object) => await axios.post(`/tasks`,data),
);
export const updateTask = asyncHandler(
  async (data: Object, id: number) => await axios.post(`/tasks/${id}`,data),
);
export const closeTask = asyncHandler(
  async (id: number) => await axios.post(`/tasks/${id}/close`),
);
export const reopenTask = asyncHandler(
  async (id: number) => await axios.post(`/tasks/${id}/reopen`),
);
export const deleteTask = asyncHandler(
  async (id: number) => await axios.delete(`/tasks/${id}`),
);