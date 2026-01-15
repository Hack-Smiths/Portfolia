// src/utils/projectApi.ts
const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllProjects() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return await res.json(); // list of projects
}

export async function addProject(project: {
  title: string;
  description: string;
  type: string;
  stack: string[];
  features: string[];
  stars: number;
  forks: number;
  lastUpdated: string;
  link: string;
}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });

  if (!res.ok) {
    throw new Error("Failed to add project");
  }

  return await res.json(); // newly created project
}

export async function deleteProject(id: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }
}

export async function updateProject(
  id: number,
  updatedFields: {
    title?: string;
    description?: string;
    type?: string;
    stack?: string[];
    features?: string[];
    stars?: number;
    forks?: number;
    lastUpdated?: string;
    link?: string;
  }
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error("Failed to update project");
  }

  return await res.json(); // updated project
}
