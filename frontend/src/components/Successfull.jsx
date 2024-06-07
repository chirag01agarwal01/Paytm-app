import { useNavigate } from "react-router-dom"
import logo from "../assets/7efs.gif"

export function Succesfull(){
    const navigate = useNavigate();
    return(
        <>
            <img src={logo} alt="done"></img>
            <button type="button" className=" w-full h-full text-white bg-green-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>{navigate("/")}}>go back</button>
    
        </>
    )
}