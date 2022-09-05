import axios from "axios";
const API_URL = "http://192.168.150.29:4000/auth/";

class AuthService{
    login(login:string, password:string){
        return axios
            .post(API_URL + "login", {
                login,
                password
            })
            .then(response => {
                if(response.data.token){
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

export default new AuthService();
