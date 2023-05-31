import { AxiosResponse } from "axios";
import { METHOD, uploadApiInstance } from "../config/axios.instance";

export type ImageResponseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  kind: string;
  ownerAccountId: string;
  ownerId: string;
  location: string[];
};
type ImageBaseResponse = BaseResponseType<ImageResponseType>;

export function GET_IMAGE(
  uuid: string
): Promise<AxiosResponse<ImageBaseResponse>> {
  return uploadApiInstance({
    method: METHOD.GET,
    url: `/upload/ownerId?ownerId=${uuid}&kind=profileImage`,
  });
}
