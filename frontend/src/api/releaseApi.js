import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getAllReleases = () => API.get("/releases");
export const createRelease = (data) => API.post("/releases", data);
export const getReleaseById = (id) => API.get(`/releases/${id}`);
export const updateRelease = (id, data) => API.put(`/releases/${id}`, data);
export const deleteRelease = (id) => API.delete(`/releases/${id}`);
