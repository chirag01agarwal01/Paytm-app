export function InputBox({label,placeholder,onChange}){
    return(
        <>
            <div className="p-1 text-black font-semibold tracking-tight">{label}</div>
            <input onChange={onChange} className="border rounded border-gray-200 text-left p-1 px-2 w-full" placeholder={placeholder}/>
        </>
    )
}