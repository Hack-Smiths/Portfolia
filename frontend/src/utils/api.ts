// src/utils/api.ts
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const res = await fetch("https://portfolia-z7of.onrender.com/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return await res.json(); // should return { username, email, id }
}

const BASE_URL = "https://portfolia-z7of.onrender.com";

export async function getUserProjects() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/projects/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function addProject(projectData: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) throw new Error("Failed to add project");
  return res.json();
}

export async function deleteProject(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

export async function updateProject(id: number, updatedData: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function fetchGithubSummary(repoUrl: string) {
  const res = await fetch(`${BASE_URL}/smart-summary?repo_url=${encodeURIComponent(repoUrl)}`);
  if (!res.ok) throw new Error("Failed to fetch GitHub summary");
  return res.json();
}
