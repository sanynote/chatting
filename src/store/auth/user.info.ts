import { atom } from 'recoil';
import { SignInType } from '../../api/auth/api.user'

export const UserInfo = atom<SignInType | null>({
  key: 'user_info',
  default: null,
});
