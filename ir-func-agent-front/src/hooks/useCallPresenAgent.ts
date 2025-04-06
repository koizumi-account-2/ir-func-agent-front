
import { useMutation } from "@tanstack/react-query";
import { TPresentationAgentState } from "@/types/type";
import { callAgent } from "@/api/fastApiClient";
import { presentationAgentStateAtom } from "@/atoms/presentationAgentStateAtom";
import { useSetAtom } from "jotai";
export const useCallPresenAgent = () => {

    const setPresentationAgentState = useSetAtom(presentationAgentStateAtom);
    return useMutation ({
        mutationFn: ({ userBackground, state }: { userBackground: string, state: TPresentationAgentState | null }) => 
            callAgent({userBackground, state}),
        onSuccess: (data) => {
            console.log(data);
            const updateState: TPresentationAgentState = {
                ...data,
            }
            setPresentationAgentState(updateState);

        },
        onError: (error) => {
            console.log(error);
        },
    });
}   