export function isAuthenticated() {
  return !!localStorage.getItem("user");
}

export function signIn(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }
  return false;
}

export function signUp(email, password, firstName, lastName) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.email === email)) {
    return false; 
  }
  const user = { email, password, firstName, lastName };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(user));
  return true;
}

export function signOut() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}