import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "e5cf8594-32cf-4be5-9a53-8fb67649cdee",
  },
});
