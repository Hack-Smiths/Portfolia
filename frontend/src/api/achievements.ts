// api/achievements.ts
export async function addAchievementAPI(
  type: 'work-experience' | 'certificates' | 'awards',
  payload: any
) {
  const token = localStorage.getItem('token'); // adjust to where your token is stored

  const res = await fetch(
    `https://portfolia-production.up.railway.app/achievements/${type}`,
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
