import { Flag, Image, MessageCircleDashedIcon, Shapes } from "lucide-react";
import InputField from "../../components/forms/InputField";
import NewTaskSetter from "../../components/tasks/NewTaskSetter";
import { useState } from "react";
import DatePickerValue from "../../components/materials-ui/DatePickerValue";
import dayjs, { Dayjs } from "dayjs";
import BrandButton from "../../components/buttons/BrandButton";
import { useNavigate } from "react-router";
import CategoryModal from "../../modals/CategoryModal";
import PriorityModal from "../../modals/PriorityModal";
import DescriptionModal from "../../modals/DescriptionModal";
import ImageModal from "../../modals/ImageModal";

type Priorty = "low" | "medium" | "high";

interface TaskErrors {
    name? : string;
    date ? : string;
}
export interface TaskData {
    title? : string;
    image ? : File | null;
    description ? : string;
    dueDate? : string;
    category? : string;
    priority? : "low" | "medium" | "high";
    status? : "pending" | "completed";
}
const AddTask = () => {
    const navigate = useNavigate();
    const [ formData, setFormData ] =  useState<TaskData>({
        category : "task",
        priority : "high",
        description : "",
        image : null,
    });
    const [ errors, setErrors] = useState<TaskErrors>();
    const [ isSubmitting, setIsSubmitting] = useState<boolean> ();
    const [ dateValue, setDateValue ] = useState<Dayjs | null >(dayjs(new Date()));
    const [categoryModal, setCategoryModal] = useState<boolean>();
    const [priorityModal, setPriorityModal] = useState<boolean>();
    const [descriptionModal, setDescriptionModal] = useState<boolean>();
    const [imageModal, setImageModal] = useState<boolean>();

    const handleNameChange = (e : any) => {
        const { name, value } = e.target;
        setFormData((prev : TaskData) => ({
            ...prev,
            [name] : value
        }))
    } 
    const handleCancleClick = (e : any) => {
        e.preventDefault()
        navigate("/dashboard");
    }
    const handleCategoryChange = (str : string) => {
        setFormData( (prev : TaskData) => ({
            ...prev,
            category : str
        }))
    }

    const handlePriorityChange = (str : string) => {
        setFormData((prev : TaskData) => ({
            ...prev,
            priority : str as Priorty
        }))
    }

    const handleDescriptionChange = (str : string) => {
        setFormData((prev : TaskData) => ({
            ...prev,
            description : str
        }))
    }

    const handleImageChange = (imageFile : File) => {
        setFormData ((prev : TaskData) => ({
            ...prev,
            image : imageFile
        }))
        //...
    }
    const handleDateChange = (date : Dayjs | null) => {
        setDateValue(date);
        setFormData((prev : TaskData) => ({
            ...prev,
            dueDate : date?.format("YYYY-MM-DD") || undefined
        }))
    }

    const handleConfirmClick = (e : any) => {
        e.preventDefault();

        //1. validate data
        //2. Try to submit data to the backend
        //3. Display successful message or failure message
        navigate("/dashboard")
        
    }
    return (
        <div className = "p-6 pt-15 min-h-screen w-full max-w-md bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ">
            
            <h4 className = "text-2xl font-semibold mb-6">Add New Task</h4>
            <form className="relative">
                <InputField 
                label = "Task"
                name="task"
                type = "text"
                placeholder="Enter task name..."
                value = { formData?.title}
                onChange = { handleNameChange }
                error = { errors?.name }
                required = { true }
                disabled  = { isSubmitting }
                
                />
                <DatePickerValue
                onDateChange={ handleDateChange }
                error = { errors?.date }
                value = { dateValue  }
                label = { "Due Date" }
                required = { true }
                 />
                
                <NewTaskSetter
                icon = { Shapes }
                title = { "Category" }
                type = { "category" }
                data = { formData?.category as string }
                onClick = { () => { setCategoryModal(true) } }
                 />
                <NewTaskSetter
                icon = { Flag }
                title = { "Priority"}
                type = { "priority" }
                data = { formData?.priority as string}
                onClick={ () => {setPriorityModal(true)} }
                />
                <NewTaskSetter 
                icon = { MessageCircleDashedIcon }
                title = { "Description" }
                type = { "description" }
                data = { formData?.description as string }
                onClick = { () => { setDescriptionModal(true) }}
                />

                <NewTaskSetter 
                icon = { Image }
                title = { "Image" }
                data = { formData?.image as File }
                type = { "image" }
                onClick = { () => { setImageModal(true) }}
                />

                <div className = "mt-20 flex gap-4 items-center justify-center">
                    <BrandButton
                    variant="secondary"
                    onClick = { handleCancleClick }
                    >
                        Cancel
                    </BrandButton> 
                    <BrandButton
                    variant = "primary"
                    onClick = { handleConfirmClick }
                    >
                        Confirm
                    </BrandButton>

                </div>
                {/*modals*/}
                { categoryModal && <CategoryModal isOpen= { categoryModal } onClose={() => {setCategoryModal(false)}} setter={ handleCategoryChange } />}
                { priorityModal && <PriorityModal isOpen = { priorityModal } onClose = { () => { setPriorityModal(false)} } setter = { handlePriorityChange } />}
                { descriptionModal && <DescriptionModal isOpen = { descriptionModal } onClose = { () => { setDescriptionModal(false)}} setter = { handleDescriptionChange } value = { formData?.description as string } />}
                { imageModal && <ImageModal isOpen = { imageModal} onClose ={ () => { setImageModal(false) }} setter = { handleImageChange } value = { null } />}

            </form>
            
        </div>
    );
}

export default AddTask;