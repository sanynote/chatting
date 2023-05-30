import { atom } from 'recoil';

export const UserInfo = atom<SignInType | null>({
  key: 'user_info',
  default: null,
});
