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

type ImageResponse = BaseResponseType<ImageResponseType>;
type FileResultType = string | Blob | null | undefined;

export function GET_IMAGE(uuid: string): Promise<AxiosResponse<ImageResponse>> {
  return uploadApiInstance({
    method: METHOD.GET,
    url: `/upload/ownerId?ownerId=${uuid}&kind=profileImage`,
  });
}

export function SET_IMAGE(
  kind: string,
  file: FileResultType
): Promise<AxiosResponse<ImageResponse>> {
  return uploadApiInstance({
    method: METHOD.POST,
    url: "/upload/one",
    data: {
      kind,
      file,
    },

    headers: {
      Accept: "*/*",
      "Content-type": "multipart/form-data",
    },
  });
}
