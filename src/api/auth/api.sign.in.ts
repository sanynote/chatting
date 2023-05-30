import {userApiInstance,METHOD} from "../config/axios.instance";
import { AxiosResponse } from "axios";

export type SignInResponseType = BaseResponseType<SignInType>;

export const SIGN_IN = (
  signInForm: Pick<SignInType, "accountId" & { password: string }>
): Promise<AxiosResponse<SignInResponseType>> => {
  return userApiInstance({
    method: METHOD.POST,
    url: "users/login",
    data: signInForm,
  });
};

