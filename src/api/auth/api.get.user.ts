import {userApiInstance,METHOD} from "../config/axios.instance";
import { AxiosResponse } from "axios";
import {SignInResponseType} from "./api.sign.in";

export const GET_CURRENT_USER = (): Promise<
  AxiosResponse<SignInResponseType>
  > => {
  return userApiInstance({
    method: METHOD.GET,
    url: `users`,
  });
};
