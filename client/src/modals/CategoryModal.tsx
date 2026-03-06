import TaskModal from "./TaskModal"
import { Categories } from "../tempData/categories";
import type { category } from "../tempData/categories";
import BrandButton from "../components/buttons/BrandButton";

interface CategoryModalProps {
    isOpen : boolean;
    onClose : () => void;
    setter : (str : string) => void
}
const CategoryModal : React.FC <CategoryModalProps> = ({
    isOpen, onClose, setter
}) => {

    const categoryList = Object.values(Categories);
    const beforeFirstSpace = ( str : string) : string => {
        const firstWord = str.split(" ")[0];
        return firstWord.toLowerCase();
    }

    const handleCategoryClick = (c : category) => {
        setter(beforeFirstSpace(c.label));
        onClose();
    }
    return(
        <TaskModal isOpen = { isOpen} onClose={onClose}>
            <h4 className=" w-full text-center font-semibold text-[14px] py-5 ">Select a category</h4>
            <div className="max-h-70 overflow-y-scroll border-b border-t border-t-slate-200 border-b-slate-200">
                <div className=" grid grid-cols-3 auto-rows-auto gap-5 py-3">
                {categoryList.map((category, index) => (
                    <button 
                    key = { index }
                    onClick = { () => { handleCategoryClick(category)} }
                    className = { `cursor-pointer flex flex-col overflow-x-hidden gap-2 items-center justify-center min-h-max` }>
                        <div className = " rounded-xl p-2" style = {{ backgroundColor : category.color}}>
                            <img 
                            src = { category.image }
                            alt = { `${category.label} icon`}
                            className = { `invert brightness-0 size-6`}
                            />
                        </div>
                        <p className="text-slate-900 text-[12px] whitespace-nowrap overflow-hidden"> {category.label} </p>

                    </button>
                ))}

                </div>
            </div>
            <div className = "px-6 p-8 w-full">
                <BrandButton 
                onClick = { onClose }
                variant="secondary">
                Close
                </BrandButton>
            </div>
            
        </TaskModal>
    );
}

export default CategoryModal;