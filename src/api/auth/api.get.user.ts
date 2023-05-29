import {userApiInstance,METHOD} from "../config/axios.instance";
import { AxiosResponse } from "axios";
import {SignInResponseType} from "./api.user";

export const GET_CURRENT_USER = (): Promise<
  AxiosResponse<SignInResponseType>
  > => {
  return userApiInstance({
    method: METHOD.GET,
    url: `users`,
  });
};
