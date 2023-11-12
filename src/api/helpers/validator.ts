/**
 * Email with `tsinghua` suffix
 */
export const validateEmail = (email: string, tsinghua: boolean = false) => {
  const isemail =
    /^([0-9a-zA-Z_.-\u4e00-\u9fa5])+@([0-9a-zA-Z_.-])+\.([a-zA-Z]{2,8})$/.test(
      email,
    );
  if (!isemail) {
    return false;
  }
  if (tsinghua) {
    return email.endsWith("tsinghua.edu.cn");
  } else {
    return true;
  }
};

/**
 * Alphanumeric username
 */
export const validateUsername = (username: string) => {
  return /^[a-zA-Z0-9]*$/.test(username);
};

/**
 * 8 length minimum password
 * with at least one lowercase, one uppercase, and one number respectively
 */
export const validatePassword = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*:;'"]{8,}$/.test(
    password,
  );
};

export const validateClass = (className: string) => {
  return /^((?!@).)*$/.test(className);
};
