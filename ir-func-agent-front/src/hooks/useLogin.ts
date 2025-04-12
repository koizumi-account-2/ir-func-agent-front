import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import { useState } from 'react';
import { AXIOS_INSTANCE_SERVER } from '@/api/springServer';    
import getCustomInstance from '@/lib/getCustomInstance';
import axios from 'axios';
import { UserInfo } from '@/types/type';

type LoginParams = {
  username: string;
  password: string;
};


export const useLogin = () => {
    const customInstance = getCustomInstance<UserInfo>(AXIOS_INSTANCE_SERVER);
    const [, setAuth] = useAtom(authAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ username, password }: LoginParams) => {
        setLoading(true);
        setError(null);

        try {
            const response= await customInstance({
                method: 'POST',
                url: '/auth/login',
                data: {
                    email: username,
                    password: password
                }
            });
            console.log("Login成功",response);
            // 成功したら状態更新
            setAuth({
                userID: response.userID,
                email: response.email,
                role: response.role
            });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'ログインに失敗しました');
            } else {
                setError('予期せぬエラーが発生しました');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            const response= await customInstance({
                method: 'POST',
                url: '/auth/logout'
            });
            console.log(response);
            // 成功したら状態更新
            setAuth(null);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'ログアウトに失敗しました');
            } else {
                setError('予期せぬエラーが発生しました');
            }
        } finally {
            setLoading(false);
            setAuth(null);
        }
        

    };
    return { login, loading, error, logout };
};