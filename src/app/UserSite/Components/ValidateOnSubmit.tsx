import * as graphql from "@/generated/graphql";
import { client } from "@/api/apollo";

export interface IValidateOnSubmit {
  (value: string): Promise<[boolean, string]>;
}
export const __ValidateEmailRegistered: IValidateOnSubmit = async (
  value: string,
) => {
  const { data } = await client.query({
    query: graphql.GetUserByEmailDocument,
    variables: { email: value },
  });
  if (data.users.length) {
    return [true, "邮箱已被注册"];
  } else {
    return [false, "邮箱未注册"];
  }
};
export const __ValidateStudentIDRegistered: IValidateOnSubmit = async (
  value: string,
) => {
  const { data } = await client.query({
    query: graphql.GetUserByStudentIdDocument,
    variables: { student_no: value },
  });
  if (data.users.length) {
    return [true, "学号已被注册"];
  } else {
    return [false, "学号未注册"];
  }
};
export const __ValidatePhoneRegistered: IValidateOnSubmit = async (
  value: string,
) => {
  const { data } = await client.query({
    query: graphql.GetUserByPhoneDocument,
    variables: { phone: value },
  });
  if (data.users.length) {
    return [true, "手机号已被注册"];
  } else {
    return [false, "手机号未注册"];
  }
};
