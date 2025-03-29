import { atom } from 'jotai';
import { UserInfo } from '@/types/type';

// ログインユーザー情報（nullなら未ログイン）
export const authAtom = atom<UserInfo | null>(null);