
import { TPresentationAgentState } from "../types/type";
import { getCustomInstance } from "../lib/getCustomInstance";
import Axios from "axios";

const AXIOS_INSTANCE_SERVER = Axios.create({ 
    baseURL: "http://fastapi-alb-140913619.ap-northeast-1.elb.amazonaws.com/api/",  
    headers: {
        'Content-Type': 'application/json',
    },withCredentials: true});
    


export const getHealthCheck = async () => {
    const customInstance = getCustomInstance(AXIOS_INSTANCE_SERVER);
    return await customInstance({
        method: 'GET',
        url: `/health`
    })
}

interface ICallAgent {
    userBackground: string;
    state: TPresentationAgentState | null;
}
export const callAgent = async ({userBackground, state}: ICallAgent) => {
    const customInstance = getCustomInstance<TPresentationAgentState>(AXIOS_INSTANCE_SERVER);
    return await customInstance({
        method: 'POST',
        url: `/presentation`,
        data: {
            "user_background": userBackground,
            "state": state
        }
    })
}
// const test = {
//     "user_background":"",
//     "state":{
//         "common_background":"AIのベンチャー企業に勤めている",
//         "thread_id":"",
//         "user_request": "AWSの勉強会を開催したい",
//         "persona_list": [],
//         "persona_confirmed": false,
//         "interview_result": [],
//         "iteration": 0,
//         "is_satisfied": false,
//         "presentation": null
//     }
// }