interface ServerErrorProps{
    message?:string
}

export function ServerError(props:ServerErrorProps) {
    return (
        <div className="bg-red-700 w-full text-white rounded-xl p-3 my-6 ">
            {props.message || "Server Error Occurs !"}
        </div>
    )
}