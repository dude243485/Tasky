import { Check } from "lucide-react";


interface SortOptionProps { 
    label : string;
    active : boolean;
    onClick : () => void;
    icon : React.ReactNode
}

const SortOption = ({label, active, onClick, icon} : SortOptionProps) => {
    return (
        <button
        onClick = { onClick }
        className= { `w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
            active ? "bg-brand-primary-100 text-brand-primary-600" : "text-slate-600 hover:bg-slate-100"
        }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            { active && <Check size = { 16 } />}
        </button>
    );
}

export default SortOption;