// src/utils/api.ts
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const res = await fetch("http://localhost:8000/me", {
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
