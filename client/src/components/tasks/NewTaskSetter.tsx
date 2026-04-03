import type { LucideIcon } from "lucide-react";
import type { category } from "../../tempData/categories";
import { Categories } from "../../tempData/categories";



interface NewTaskSetterProps {
    icon : string | LucideIcon;
    title : string;
    data : string | number | category | boolean | File;
    type : "category" | "image" | "description" | "priority" | "other";
    onClick : () => void;
    
}


//they do not need the value, but they need to be able to set the value

const NewTaskSetter : React.FC<NewTaskSetterProps> = ( {icon : Icon, title, data,onClick, type}) => {

    const handleClick = (e: any) => {
        e.preventDefault()
        onClick()
    }
    const category = Categories[data as keyof typeof Categories]

    let imageUrl : string | null = null;
    
    if (type === "image" && data !== null ) {
        imageUrl  = URL.createObjectURL(data as File);
    }

    let descStr = " "
    if (type === "description" && typeof data === "string") {
        descStr = data.slice(0,50) + "...";
    }

    
    
    

    return (
        <button 
        onClick = { handleClick }
        className = "flex justify-between w-full items-center gap-3 py-4 border-b border-b-slate-200 cursor-pointer mt-2">
            <Icon className="size-6 text-brand-primary-600" />
            <h4 className = "text-[14px] text-left flex-1"> {title }</h4>
            {
                 type === "priority" && typeof data === "string" && (
                    <div className="bg-brand-primary-200 rounded-md flex items-center justify-center px-6 py-2">
                        <p className="text-[14px] text-brand-primary-900 font-semibold">{data}</p>
                    </div>
                )
            }
            {
                type === "image" && <div></div>
            }
            {
                type === "other" &&  typeof data === "number" &&(
                    <div className = "bg-brand-primary-300 items-center justify-center p-2 rounded-full ">
                        <p className="text-[14px] text-brand-primary-900 font-semibold">{data}</p>
                    </div>
                )
            }
            { 
                type === "category"  && (
                    <div className="flex gap-2 items-center">
                        <p 
                        className="text-[12px] font-semibold"
                        style = {{ color : category?.color }}>{category?.label}</p>
                        <div className = "rounded-md p-1 "
                        style = {{ backgroundColor : category?.color}}>
                            <img
                            src =  { category?.image}
                            className = "invert brightness-0 size-4"
                            />
                        </div>
                    </div>
                )
            }
            {
                type === "image" && data !== null && (
                    <div className = "relative group overflow-hidden rounded-md shadow-md w-30 h-4/5">
                        <img 
                        src = { imageUrl as string }
                        alt = "image preview"
                        className = "w-full h-12.5 object-cover shadow-inner"
                        
                        />
                    </div>
                )
            }
            {
                type === "description" && typeof data === "string" && (
                    <div className = "w-33 h-4/5">
                        <p className="text-[11px] text-slate-400 text-right">{descStr}</p>
                    </div>
                )
            }

        </button>
    );
}

export default NewTaskSetter;