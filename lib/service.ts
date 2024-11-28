"use server";
import axios from "axios";
import useAuth, { session } from "./action";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function register(user: any) {
  try {
    const response = await api.post("/api/register", {
      name: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(user: any) {
  try {
    const response = await api.post("/api/login", {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    if (response.data.token) {
      await session(response.data.token);
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const resp = await api.get("/api/users", {
      headers: {
        Authorization: `Bearer ${await useAuth()}`,
      },
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return error;
  }
}

export async function deleteUser(id: string) {
  try {
    const resp = await api.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${await useAuth()}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error;
  }
}

export async function editUser(id: string, data: any) {
  try {
    console.log(data);
    const resp = await api.put(
      `/api/users/${id}`,
      {
        name: data.username,
        email: data.email,
        role: data.role,
        password: data.password,
      }, // Include the data to be sent in the request body
      {
        headers: {
          Authorization: `Bearer ${await useAuth()}`, // Make sure to pass the correct auth token
        },
      }
    );
    console.log(resp.data);
    return resp.data; // Return the response data (the updated user info or a success message)
  } catch (error) {
    console.error("Error editing user:", error);
    return error; // Return the error if something goes wrong
  }
}

export async function getAllProducts() {
  try {
    const resp = await api.get("/api/products", {
      headers: {
        Authorization: `Bearer ${await useAuth()}`,
      },
    });
    return resp.data;
  } catch (error) {
    return error;
  }
}

export async function createProducts(data: any) {
  try {
    // Créez une instance FormData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString()); // Convertissez le prix en chaîne de caractères
    formData.append("stock", data.stock.toString()); // Si vous gérez aussi le stock
    formData.append("category", data.category)
    if (data.image) {
      formData.append("image", data.image); // Ajoutez l'image
    }

    // Envoyez la requête avec FormData
    const resp = await api.post("/api/product", formData, {
      headers: {
        Authorization: `Bearer ${await useAuth()}`,
        "Content-Type": "multipart/form-data", // Indique que c'est une requête multipart
      },
    });

    console.log(resp);
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

