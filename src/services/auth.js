import http from "./http";
import { toast } from "react-toastify";

class AuthService {
    login(payload) {
        return http.post("login/", payload).then((res) => {
            
            const user = res.data
            localStorage.setItem("user", JSON.stringify(user))
            
            toast.success("logged in")
            return user
        })
    } 

    signup(payload) {
        return http.post("signup/", payload).then(() => {
            toast.success("register OK. please log in.")
        })
    }
}

export default new AuthService()