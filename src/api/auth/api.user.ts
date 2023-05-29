import {userApiInstance,METHOD} from "../config/axios.instance";
import { AxiosResponse } from "axios";

export type SignInType =  {
  readonly id: string;
  accountId: string;
  phone: string;
  nickname: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
  isMarketing: boolean;
  selfIntroduction: string;
  profileImage?: string | undefined;
  backImage?: string | null | Blob;
  accessToken: string;
  refreshToken: string;
  profileImageId: string | undefined;
  backImageId: string | undefined;
};

export type SignInResponseType = BaseResponseType<SignInType>;

export const SIGN_UP = (
  signInForm: Pick<SignInType, "accountId" & { password: string }>
): Promise<AxiosResponse<SignInResponseType>> => {
  return userApiInstance({
    method: METHOD.POST,
    url: "users/login",
    data: signInForm,
  });
};

export const SIGN_IN = (
  signInForm: Pick<SignInType, "accountId" & { password: string }>
): Promise<AxiosResponse<SignInResponseType>> => {
  return userApiInstance({
    method: METHOD.POST,
    url: "users/login",
    data: signInForm,
  });
};

