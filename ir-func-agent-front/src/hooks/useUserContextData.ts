import { getUserContext, updateContext } from "@/api/springServer";
import { useMutation, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { authAtom } from "@/atoms/authAtom";
import { TUserContextInput } from "@/types/type";
export const useUserContextData = () => {
    const auth = useAtomValue(authAtom);
    console.log("userContextData", auth);
    if (!auth) {
        throw new Error('ログインしていません');
    }
    const { data, isLoading, error } = useSuspenseQuery({
        queryKey: ['userContext', auth.userID],
        queryFn: () => getUserContext(auth.userID),
        staleTime: 60 * 1000,
    });
    return { data, isLoading, error };
}   
export const useUpdateUserContext = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,input}:{id:string,input: TUserContextInput}) => 
            updateContext({id,input}),
        onSuccess: (data,{id}) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["userContext",parseInt(id)] });
        },
        onError: (error) => {
            console.log(error);
        },
    });
}