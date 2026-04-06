import { students } from "../data/students";

export const getUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const loginDetails = (uid, password) => {
  const student = students.find(
    (s) => s.uid === uid && s.password === password,
  );

  if (!student) return false;

  const { password: _, ...safeUser } = student;

  localStorage.setItem("user", JSON.stringify(safeUser));
  return true;
};

export const logout = () => {
  localStorage.removeItem("user");
};
