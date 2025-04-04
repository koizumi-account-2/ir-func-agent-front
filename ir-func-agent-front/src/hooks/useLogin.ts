import { useAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';
import { useState } from 'react';
import { AXIOS_INSTANCE_DB, AXIOS_INSTANCE_SERVER } from '@/lib/apiClient';
import useCustomInstance from './useCustomInstance';
import axios, { AxiosResponse } from 'axios';
import { UserInfo } from '@/types/type';

type LoginParams = {
  username: string;
  password: string;
};


export const useLogin = () => {
    
    //const customInstance = useCustomInstance<UserInfo>(AXIOS_INSTANCE_DB);
    const customInstance = useCustomInstance<UserInfo>(AXIOS_INSTANCE_SERVER);
    const [, setAuth] = useAtom(authAtom);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async ({ username, password }: LoginParams) => {
        setLoading(true);
        setError(null);

        try {
            const response= await customInstance({
                method: 'POST',
                url: '/login',
                data: {
                    email: username,
                    password: password
                }
            });
            console.log(response);
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

    return { login, loading, error };
};