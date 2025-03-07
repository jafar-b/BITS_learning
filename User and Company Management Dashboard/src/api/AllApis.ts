import axios from "axios";
import { User } from "../models/User";
const BASE_URL = `https://json-placeholder.mock.beeceptor.com/`;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const handleRequest = async (request: any) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error);
    throw error;
  }
};

export async function loginUser(data: User) {
  return handleRequest(axiosInstance.post(`/login`, data));
}

export async function getAllUsers() {
  return handleRequest(axiosInstance.get(`/users`));
}

export async function getAllCompanies() {
  return handleRequest(axiosInstance.get(`/companies`));
}

export async function getAllRoles() {
  return handleRequest(axiosInstance.get(`/roles`));
}

export async function getAllPosts() {
  return handleRequest(axiosInstance.get(`/posts`));
}

export async function getAllComments() {
  return handleRequest(axiosInstance.get(`/comments`));
}

export async function getAllTodos() {
  return handleRequest(axiosInstance.get(`/todos`));
}
