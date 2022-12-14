import axios from "axios";
import IUser from "../types/user.type";
import authHeader from './auth-header';
import ICreateUser from '../types/create-user.type';
const API_URL = "http://192.168.150.13:4000/users";

class UserService{

    getAllUsers(){
        console.log(authHeader());
        return axios.get<Array<IUser>>(API_URL, {headers: authHeader()});
    }

    createUser(user: ICreateUser){
        return axios.post(API_URL, {user}, {headers: authHeader()});
    }

    updateUser(user: ICreateUser){
        return axios.put(API_URL, {headers: authHeader()});
    }

    deleteUser(id: number){
        console.log((API_URL+`/${id}`));
        return axios.delete(API_URL+`/${id}`, {headers: authHeader()});
    }

    getUserByLogin(login: string){
        return axios.get<IUser>(API_URL+`/${login}`, {headers: authHeader()});
    }
    
}

export default new UserService();