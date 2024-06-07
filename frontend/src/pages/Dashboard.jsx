import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useState,useEffect } from "react"
import axios from "axios";
export const Dashboard = ()=>{
    const[balance,setBalance]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{headers:{ Authorization:"Bearer "+localStorage.getItem("token")}}).then( response=>{
        setBalance(response.data.balance)
        })
    },[])
    return(
        <div className="h-dvh bg-gray-200">
            <div className="p-[0.5%]">
             <AppBar/>
            </div>
            <div className="px-12 pt-5">
              <Balance value={balance}/> 
              <Users/> 
            </div>
        </div>
    )
}