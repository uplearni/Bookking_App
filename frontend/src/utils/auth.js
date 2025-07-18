const ADMIN_CREDENTIALS = [
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' }
];

const getUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const signup = (name, email, password) => {
  if (ADMIN_CREDENTIALS.some(admin => admin.email === email)) {
    return { success: false, message: 'Email is reserved for admin use' };
  }

  const users = getUsers();
  if (users.some(user => user.email === email)) {
    return { success: false, message: 'Email already exists' };
  }

  const newUser = { name, email, password, role: 'user' };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return { success: true, user: newUser };
};

export const login = (email, password) => {
  const users = getUsers();
  const allUsers = [...ADMIN_CREDENTIALS, ...users];
  const user = allUsers.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
};