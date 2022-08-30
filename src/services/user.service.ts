import axios from "axios";
import IUser from "../types/user.type";
import authHeader from './auth-header';
import ICreateUser from '../types/create-user.type';
const API_URL = "http://192.168.150.29:4000/users";

class UserService{

    getAllUsers(){
        return axios.get<Array<IUser>>(API_URL, {headers: authHeader()});
    }

    createUser(user: ICreateUser){
        return axios.post(API_URL, {headers: authHeader()});
    }

    updateUser(user: IUser){
        return axios.put(API_URL, {headers: authHeader()});
    }

    deleteUser(id: number){
        return axios.delete(API_URL+`/${id}`, {headers: authHeader()});
    }

    getUserByLogin(login: string){
        return axios.get<IUser>(API_URL+`/${login}`, {headers: authHeader()});
    }
    
}

export default new UserService();