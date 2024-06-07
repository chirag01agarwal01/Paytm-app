import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "./ButtonComponent";

export function AppBar(){
    const navigate = useNavigate();
    return(
        <div className="bg-white rounded-lg shadow-lg mx-4 p-4 flex justify-between">
            <div className="font-medium text-lg flex flex-col justify-center">PayTM</div>
            <div className="flex justify-between">
            <div className="flex justify-between">
                <div className="flex flex-col justify-center text-base font-medium pr-2">{localStorage.getItem("firstName").toUpperCase()+" "}{localStorage.getItem("lastName").toUpperCase() || "hello"}</div>
                <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center self-center">
                    <div className="flex flex-col justify-center font-semibold text-xl">
                        {localStorage.getItem("firstName")[0].toUpperCase() || "T"}
                    </div>
                </div>
                
            </div>
            <div className="pl-2">
            
            <ButtonComponent onclick={()=>{
                localStorage.removeItem("token")
                localStorage.removeItem("firstName")
                localStorage.removeItem("lastName")
                
                navigate("/signin")

            }} label={"SignOut"}/>
            
            </div>
            </div>
        </div>
    )
}