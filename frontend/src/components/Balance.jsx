

export function Balance({value}){
    

    return(
        <div className="flex">
            <div className="text-lg font-bold">Your Balance </div>
            <div className="font-semibold pl-4 text-lg"> Rs. {value} </div>
        </div>
    )
}