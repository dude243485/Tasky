import { useEffect, useState } from "react";

interface DOBProps {
    onDateChange : (dateString: string) => void;
    error? : string ;
}

const DOBInput : React.FC<DOBProps> = ({
    onDateChange, error
}) => {

    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");

    //months for drop down
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October","November", "December"
    ];

    //update the parent whenever a segment changes
    useEffect(() => {
        if (day && month && year){
            const formattedMonth = (month.indexOf(month) + 1).toString().padStart(2, "0");
            const formattedDay = day.padStart(2, "0");
            onDateChange(`${year}-${formattedMonth}-${formattedDay}`)
        } else {
            onDateChange("");
        }

    }, [day, month, year])
  return (
    <div className = "flex flex-col space-y-2">
        <label className="text-[12px] text-slate-400">Date of Birth</label>
        <div className="flex gap-3">
            {/*Month Dropdown*/}
            <div className = "flex-2 ">
                <select
                value = { month }
                onChange = {(e) => setMonth(e.target.value) }
                className = {`w-full p-3 pr-3  border rounded-xl outline-none transition-all
                    focus:ring-2 focus:ring-brand-primary-500 
                    ${error ? "border-brand-error-500" : "border-slate-400"}`}
                >
                    <option value = "" disabled>Month</option>
                    {months.map(m=> <option key = {m} value = {m}>{m}</option>)}

                </select>
            </div>

            {/*Day input*/}
            <div className = "flex-1">
                <input 
                type = "text"
                placeholder="DD"
                maxLength={2}
                value = {day}
                onChange = {
                    (e) => setDay(e.target.value.replace(/\D/g, ""))
                }
                className = {`w-full p-3 text-center  border rounded-xl outline-none transition-all focus:ring-2 focus:ring-brand-primary-500
                    ${error ? "border-brand-error-500" : "border-slate-400"}`}
                />
            </div>

            {/*year input*/}
            <div className="flex-1">
                <input
                type = "text"
                placeholder="YYYY"
                maxLength = {4}
                value = { year }
                onChange = {
                    (e) => setYear(e.target.value.replace(/\D/g, ""))
                }
                className= {`w-full p-3 text-center border rounded-xl outline-none transition-all focus:ring-2 focus:ring-brand-primary-500 ${
                    error ? "border-brand-error-500" : "border-slate-400"
                }  `}
                />
            </div>
            { error && <p className = "text-[10px] text-brand-error-500 font-medium">{error}</p>}

        </div>
    </div>
  )
}

export default DOBInput