import { useState,useEffect } from "react"
import { ButtonComponent } from "../components/ButtonComponent"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { Succesfull } from "../components/Successfull"
export const SendMoney = ()=>{
    const [params]=useSearchParams();
    const [amount,setAmount]=useState(0);
    const username = params.get("username");
    const name = params.get("name");
    const navigate = useNavigate();
    const[balance,setBalance]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{headers:{ Authorization:"Bearer "+localStorage.getItem("token")}}).then( response=>{
        setBalance(response.data.balance)
        })
    },[])
   
    const [isOpen, setIsOpen] = useState(true);
      
    function toggle() {
        setIsOpen((isOpen) => !isOpen);
    }

      
    return(
        <div className="bg-gray-500">
        <div className="grid h-screen place-items-center">
        <div className="bg-white rounded-lg shadow-lg p-5 w-80">
            {isOpen&&<Heading label={"Send Money"}/>}
            {isOpen&&<div className="flex justify-center pt-10">
                <div className="flex justify-center w-12 h-12 rounded-full bg-green-500">
                    <div className="flex flex-col justify-center font-medium">{name[0].toUpperCase()}</div>
                </div>
            </div>}
            {isOpen&&<div className="flex justify-center pt-2 pb-10 text-lg font-semibold">{name}</div>}
            {isOpen&&<div className="flex justify-center pt-2 pb-10 text-lg font-semibold">{"Balance:"+balance}</div>}
              
            {isOpen&&<InputBox onChange={(e)=>{setAmount(e.target.value)}}label={"Amount(Rs)"} placeholder={"enter amount"}/>}
            {isOpen&&<div className="pt-4">
                <ButtonComponent onclick={async ()=>{
                    try{
                        const res = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: username,
                            amount:amount
                        },{
                            headers:{
                                Authorization:"Bearer "+localStorage.getItem("token")
                            }
                        });
                        
                        setIsOpen(false)
                    }
                    catch(error){
                        console.log(error)
                        alert(error.response.data.message)
                    }    
                }

                } label={"Initiate Transfer"}/>
            </div>}
            {!isOpen&&<Succesfull/>}
        </div>
        </div>
        </div>
    )
}