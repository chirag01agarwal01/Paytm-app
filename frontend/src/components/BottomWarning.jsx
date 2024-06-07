import { Link } from "react-router-dom";

export function BottomWarning({label,linklabel,to}){
    return(
        <div className="p-1 flex text-sm justify-center space-x-1">
            <div>{label}</div>
            <Link className="underline pointer cursor-pointer " to={to}>{linklabel}</Link>
        </div>
    )
}