import { AxiosResponse } from "axios";
import { METHOD, uploadApiInstance } from "../config/axios.instance";

export type GetImageResponseType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  kind: string;
  ownerAccountId: string;
  ownerId: string;
  location: string[];
};

type SetImageResponseType = {
  createdAt: string;
  deletedAt: string | null;
  id: string;
  kind: string;
  location: string[];
  ownerAccountId: string;
  ownerId: string;
  updatedAt: string | null;
};

type ImageGetResponse = BaseResponseType<GetImageResponseType>;
type ImageSetResponse= BaseResponseType<SetImageResponseType>
type fileReaderResultType = string | Blob | null | undefined;

export function GET_IMAGE(
  uuid: string
): Promise<AxiosResponse<ImageGetResponse>> {
  return uploadApiInstance({
    method: METHOD.GET,
    url: `/upload/ownerId?ownerId=${uuid}&kind=profileImage`,
  });
}

export function SET_IMAGE(
  kind: string,
  file: fileReaderResultType,
): Promise<AxiosResponse<ImageGetResponse>> {
  return uploadApiInstance({
    method: METHOD.POST,
    url: '/upload/one',
    data: {
      kind,
      file,
    },

    headers: {
      Accept: '*/*',
      'Content-type': 'multipart/form-data',
    },
  });
}
