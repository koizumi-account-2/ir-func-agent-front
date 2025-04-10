

import { TUserContextInput, TUserContext } from "@/types/type";
import { getCustomInstance } from "../lib/getCustomInstance";
import Axios from "axios";

const AXIOS_INSTANCE_SERVER = Axios.create({ 
    baseURL: 'http://localhost:8080/',  
    headers: {
        'Content-Type': 'application/json',
    },withCredentials: true});
    


export const getUserContext = async (userID: string) => {
    const customInstance = getCustomInstance<TUserContext>(AXIOS_INSTANCE_SERVER);
    return await customInstance({
        method: 'GET',
        url: `/user/${userID}`
    })
}

export const updateContext = async ({id,input}:{id:string,input: TUserContextInput}) => {
    const customInstance = getCustomInstance<TUserContext>(AXIOS_INSTANCE_SERVER);
    return await customInstance({
        method: 'POST',
        url: `/user/${id}/context`,
        data: {
            userContext: input.userContext
        }
    })
}

// export const updateTotalTokens = async ({id,input}:{id:string,input: number}) => {
//     return await customInstance({
//         method: 'POST',
//         url: `/user/${id}/totaltokens`,
//         data: {
//             totalTokens: input
//         }
//     })
// }