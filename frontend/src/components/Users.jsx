import { useEffect, useState } from "react"
import { InputBox } from "./InputBox"
import { ButtonComponent } from "./ButtonComponent"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export function Users(){
    const [users,setUsers]=useState([]);
    const [filter,setFitler]=useState("");
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{headers:{ Authorization:"Bearer "+localStorage.getItem("token")}}).then( response=>{
        setUsers(response.data.user)
        })
    },[filter])
    return(
        <div>
            <div className="text-xl font-bold mt-6">Users</div>
            <InputBox onChange={(e)=>{setFitler(e.target.value)}} placeholder={"search for users here..."} />
            <div className="p-2">{users.map(user=><User key={user._id} user={user}/>)}</div>
        </div>
    )
}
function User({user}){
    const navigate = useNavigate();
    return(
        <div className="p-1 flex justify-between">
            <div className="flex self-center">
                <div className="flex justify-center w-12 h-12 rounded-full bg-gray-500">
                    <div className="flex flex-col justify-center">{user.firstName[0].toUpperCase()}</div>
                </div>
                <div className=" flex self-center pl-3 text-lg font-medium ">
                    <div className="pl-1">
                        {user.firstName} 
                    </div>
                    <div className="pl-1">
                        {user.lastName}
                    </div>

                </div>
            </div>
            <div className="">
            <ButtonComponent onclick={(e)=>{
                navigate("/send?username="+user.username+"&name="+user.firstName+" "+user.lastName);
            }} label={"Send Money"} />
            </div>
        </div>
    )
}