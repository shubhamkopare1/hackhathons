import axios from "axios";

export const registerUser = async (formData) => {
  return await axios.post("http://localhost:3000/api/team/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const login = async (data) => {
  return await axios.post("http://localhost:3000/api/auth/login", data);
};

