import { BottomWarning } from "../components/BottomWarning"
import { ButtonComponent } from "../components/ButtonComponent"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signin = ()=>{
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-gray-500">
        <div className="grid h-screen place-items-center">
        <div className="bg-white rounded-lg shadow-lg p-5 w-80">
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter your credentials to access your account"}/>
            
            <InputBox onChange={(e) => { setEmail(e.target.value)}} label={"Email"} placeholder={"enter your Email"}/>
            <InputBox onChange={(e) => { setPassword(e.target.value)}} label={"Password"} placeholder={"enter your Password"}/>
            <div className="pt-4">
                <ButtonComponent onclick={async ()=>{
                    
                    try{
                    const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        username : Email,
                        password : Password,
                    });
                    localStorage.setItem("token",res.data.token);
                    console.log("here")
                    const res2 = await axios.get("http://localhost:3000/api/v1/user/me?filter="+Email);
                    console.log(res2.data)
                    localStorage.setItem("firstName",res2.data.user[0].firstName);
                    localStorage.setItem("lastName",res2.data.user[0].lastName);
                    navigate("/")
                    }
                    catch(error){
                        
                        alert(error.response.data.message)
                        }
                    }
            } label={"Sign In"}/>
            </div>
            <BottomWarning label={"Don't have an account? "} linklabel={"Sign Up"} to={"/signup"}/> 
        </div>
        </div>
        </div>
    )
}