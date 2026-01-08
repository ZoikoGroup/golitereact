export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("golite_token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("golite_token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
