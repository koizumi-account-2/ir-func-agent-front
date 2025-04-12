import Axios from "axios";

export const AXIOS_INSTANCE_DB = Axios.create({ 
    baseURL: 'http://localhost:4040/'});

// import { useCustomInstance } from '../hooks/useCustomInstance';
// import { userApi } from '../libs/apiClients';

// const SomeComponent = () => {
//   const fetchUser = useCustomInstance<{ name: string }>(userApi);


export const AXIOS_INSTANCE_SERVER = Axios.create({ 
    baseURL: 'http://localhost:8080/',  
    headers: {
    'Content-Type': 'application/json',
    },withCredentials: true});


    //fastapi-alb-263824399.ap-northeast-1.elb.amazonaws.com