export interface IValidateRealTime {
  (value: string): [boolean, string];
}

export const __ValidateEmail: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "邮箱不能为空"];
  }
  const isemail =
    /^([0-9a-zA-Z_.-\u4e00-\u9fa5])+@([0-9a-zA-Z_.-])+\.([a-zA-Z]{2,8})$/.test(
      value,
    );
  if (isemail) {
    return [true, ""];
  } else {
    return [false, "错误的邮箱格式"];
  }
};

export const __ValidateStudentEmail: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "清华邮箱不能为空"];
  }
  if (value.endsWith("@mails.tsinghua.edu.cn")) {
    return __ValidateEmail(value);
  } else {
    return [false, "错误的学生邮箱格式"];
  }
};

export const __ValidateTeacherEmail: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "清华邮箱不能为空"];
  }
  if (value.endsWith("@tsinghua.edu.cn")) {
    return __ValidateEmail(value);
  } else {
    return [false, "错误的教师邮箱格式"];
  }
};

export const __ValidatePhone: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "手机号不能为空"];
  }
  if (/^[0-9]+$/.test(value) && value.length === 11) {
    return [true, ""];
  } else {
    return [false, "错误的手机号格式"];
  }
};

export const __ValidateStudentID: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "学号不能为空"];
  }
  if (/^[0-9]+$/.test(value) && value.length === 10) {
    return [true, ""];
  } else {
    return [false, "错误的学号格式"];
  }
};

export const __ValidateClass: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "班级不能为空"];
  }
  if (/^[\u4e00-\u9fa5]+[0-9]+$/.test(value)) {
    return [true, ""];
  } else {
    return [false, "错误的班级格式"];
  }
};

export const __ValidateName: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "姓名不能为空"];
  }
  if (/^[\u4e00-\u9fa5]+$/.test(value) || /^[a-zA-Z\s]+$/.test(value)) {
    return [true, ""];
  } else {
    return [false, "错误的姓名格式"];
  }
};

export const __ValidateUsername: IValidateRealTime = (value: string) => {
  if (!value) {
    return [false, "用户名不能为空"];
  }
  if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
    return [true, ""];
  } else {
    return [false, "用户名应以字母开头，只包含字母和数字"];
  }
};
