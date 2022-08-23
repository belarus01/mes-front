import axios from "axios";
const API_URL = "http://localhost:4000/api/auth";

export default class AuthService{
    login(login:string, password:string){
        return axios
            .post(API_URL + "login", {
                login,
                password
            })
            .then(response => {
                if(response.data.accessToken){
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data;
            });
    }

    logout(){
        localStorage.removeItem("user");
    }

    getCurrentUser(){
        const user = localStorage.getItem("user");
        if(user) return JSON.parse(user);
        return null;
    }
}
