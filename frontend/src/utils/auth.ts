// 📄 src/utils/auth.ts

// Helper to get token
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// ✅ New: Logout helper
export const logout = (): void => {
  localStorage.removeItem("token"); // remove JWT
};
