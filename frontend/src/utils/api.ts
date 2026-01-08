// src/utils/api.ts

const BASE_URL = "https://portfolia-awd7.onrender.com";

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/me`, {
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

// ---------------- PORTFOLIO ----------------

export async function getPortfolioPreview() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/portfolio/preview`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio preview");
  }

  return await res.json();
}

// ---------------- PROFILE ----------------
export async function getProfile() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/profile/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  console.log("Profile API response:", data); // 👈 Check what comes back
  return data;
}

export async function saveProfile(profileData: any) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/profile/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    throw new Error("Failed to save profile");
  }

  return await res.json();
}

// Projects API endpoints

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


// Achievements API endpoints

// GET
export async function getAchievementsAPI(
  type: 'work-experience' | 'certificates' | 'awards'
) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/achievements/${type}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }

  return res.json();
}

// ADD
export async function addAchievementAPI(
  type: 'work-experience' | 'certificates' | 'awards',
  payload: any
) {
  const token = localStorage.getItem('token'); // adjust to where your token is stored

  const res = await fetch(
    `${BASE_URL}/achievements/${type}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // 👈 attach token if available
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to add ${type}`);
  }

  return res.json();
}

// UPDATE
export async function updateAchievementAPI(
  type: 'work-experience' | 'certificates' | 'awards',
  id: number,
  data: any
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/achievements/${type}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`Failed to update ${type}`);

  return res.json();
}

// DELETE
export async function deleteAchievementAPI(
  type: 'work-experience' | 'certificates' | 'awards',
  id: number
) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/achievements/${type}/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete ${type} with id ${id}`);
  }

  // If your backend returns some json on delete, you can return it here, 
  // otherwise just return true/void
  return true;
}

// Skills API endpoints

export async function getSkills() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/skills/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json(); // returns array of skills
}

export async function addSkill(skillData: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/skills/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(skillData),
  });
  if (!res.ok) throw new Error("Failed to add skill");
  return res.json();
}

export async function updateSkill(id: number, updatedData: any) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update skill");
  return res.json();
}

export async function deleteSkill(id: number) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/skills/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete skill");
  return true;
}
