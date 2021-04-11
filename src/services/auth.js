import http from "./http";
import { toast } from "react-toastify";

class AuthService {
    login(payload) {
        return http.post("login/", payload).then((res) => {
            
            const user = res.data
            localStorage.setItem("user", JSON.stringify(user))
            
            toast.success("登录成功")
            return user
        })
    } 

    signup(payload) {
        return http.post("signup/", payload).then(() => {
            toast.success("注册成功，请登录")
        })
    }
}

export default new AuthService()