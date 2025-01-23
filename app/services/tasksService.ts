import axiosInstance from "../lib/axiosInstance";
import { ApiResponse } from "../models/apiResponse";
import { Task } from "../models/task";

const apiUrl = "/tasks";

export const createTask = async (
  task: Partial<Task>
): Promise<ApiResponse<Task>> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Task>>(apiUrl, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Task[]>>(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const getTasksById = async (id: number): Promise<ApiResponse<Task>> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Task>>(
      `${apiUrl}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTask = async (
  id: number,
  updateData: Partial<Task>
): Promise<ApiResponse<Task>> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Task>>(
      `${apiUrl}/${id}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<ApiResponse<Task>> => {
  try {
    const response = await axiosInstance.delete<ApiResponse<Task>>(
      `${apiUrl}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
