import { userApiInstance, METHOD } from "../config/axios.instance";
import { AxiosResponse } from "axios";
import { SignInResponseType } from "./api.sign.in";

type CheckAccountIdResponse = BaseResponseType<{
  readonly validateAccountId: boolean;
}>;
type CheckNickNameResponse = BaseResponseType<{
  readonly validateNickname: boolean;
}>;
type CertificationPhoneResponse = BaseResponseType<{
  readonly validatePhone: boolean;
}>;

export const CHECK_ACCOUNT_ID = (
  accountId: string
): Promise<AxiosResponse<CheckAccountIdResponse>> => {
  return userApiInstance({
    method: METHOD.GET,
    url: `/users/exists/accountId/${accountId}`,
  });
};

export const CHECK_NICKNAME = (
  nickname: string
): Promise<AxiosResponse<CheckNickNameResponse>> => {
  return userApiInstance({
    method: METHOD.GET,
    url: `/users/exists/nickname/${nickname}`,
  });
};

export const CERTIFICATION_PHONE = (
  phone: string
): Promise<AxiosResponse<CertificationPhoneResponse>> => {
  return userApiInstance({
    method: METHOD.GET,
    url: `/users/exists/phone/${phone}`,
  });
};

export const SIGN_UP = (
  signInForm: Pick<
    SignInType,
    "accountId" | "nickname" | "phone" | "isMarketing"
  > & {
    password: string;
    confirmPassword: string;
  }
): Promise<AxiosResponse<SignInResponseType>> => {
  return userApiInstance({
    method: METHOD.POST,
    url: "/users/register",
    data: signInForm,
  });
};
