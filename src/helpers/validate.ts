import isEmail from "isemail";

/**
 * Email with `tsinghua` suffix
 */
export const validateEmail = (email: string, tsinghua: boolean) => {
  if (!isEmail.validate(email)) {
    return false;
  }

  if (tsinghua) {
    return email.endsWith("tsinghua.edu.cn");
  } else {
    return !email.endsWith("tsinghua.edu.cn");
  }
};

/**
 * Alphanumeric username
 */
export const validateUsername = (username: string) => {
  return /^[a-zA-Z0-9]*$/.test(username);
};

/**
 * 12 length minimum password
 * with at least one lowercase, one uppercase, one special character and one number respectively
 */
export const validatePassword = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{12,}$/.test(
    password
  );
};
