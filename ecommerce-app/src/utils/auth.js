export const loginCredentials = {
  uid: "654321",
  password: "12345",
};

export const loginDetails = (uid, password) => {
  if (uid === loginCredentials.uid && password === loginCredentials.password) {
    const user = {
      uid,
      role: "Student",
      name: "Student User",
    };

    localStorage.setItem("user", JSON.stringify(user));
    return true;
  }
  return false;
};
