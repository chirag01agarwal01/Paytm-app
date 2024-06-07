import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { ButtonComponent } from "../components/ButtonComponent"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = ()=>{
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-gray-500">
        <div className="grid h-screen place-items-center">
        <div className="bg-white grey rounded-lg shadow-lg p-5 w-80">
            <Heading label={"Sign Up"}/>
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox onChange={(e) => { setFirstName(e.target.value)}} label={"First Name"} placeholder={"enter your first name"}/>
            <InputBox onChange={(e) => { setLastName(e.target.value)}} label={"Last Name"} placeholder={"enter your last Name"}/>
            <InputBox onChange={(e) => { setEmail(e.target.value)}} label={"Email"} placeholder={"enter your Email"}/>
            <InputBox onChange={(e) => { setPassword(e.target.value)}} label={"Password"} placeholder={"enter your Password"}/>
            <div className="pt-4">
                <ButtonComponent onclick={async ()=>{
                    
                    try{
                        const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username : Email,
                            password : Password,
                            firstName: firstName,
                            lastName: lastName
                        });
                        localStorage.setItem("token",res.data.token);
                        localStorage.setItem("firstName",firstName);
                        localStorage.setItem("lastName",lastName);
                        navigate("/")
                    }
                    catch(error){
                        alert(error.response.data.message)
                    }
                }
            }
            label={"Sign up"}/>
            </div>
            <BottomWarning label={"already have an account? "} linklabel={" login"} to={"/signin"}/> 
        </div>
        </div>
        </div>
    )
}