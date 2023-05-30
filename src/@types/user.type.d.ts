type SignInType =  {
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
