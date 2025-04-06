import { TUserContext  } from '@/types/type';
import { atom } from 'jotai';

const initialUserContext: TUserContext = {
  id: "",
  userContext: "",
  totalTokens: 0,
};

export const userContextAtom = atom<TUserContext>(initialUserContext);