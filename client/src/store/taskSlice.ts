import { createAsyncThunk, createSlice, type  PayloadAction} from "@reduxjs/toolkit"
import { type Task } from "../types/taskTypes"
import { dummyTasks } from "../tempData/tasks";

interface TasksState {
    items : Task[];
}

interface FilterParams {

}

//query database to get Tasks here
const initialState : TasksState = {
    items : dummyTasks,
}

export const getTasks = createAsyncThunk("api/tasks", 
    async ( filter : FilterParams, { rejectWithValue })=> {
        try {
            // const res = 

        } catch (err : any){
            rejectWithValue( err.response?.data?.message || "Task fetch failed!")
        }
    }
)

export const tasksSlice = createSlice ({
    name : "tasks",
    initialState,
    reducers : {
        addTask : (state, action: PayloadAction<Task>) => {
            state.items.push(action.payload)
        },
        toggleTask : (state, action : PayloadAction<string>) => {
            const task = state.items.find( t => t.id === action.payload);
            if (task) {
                if (task.status == "completed") task.status = "pending";
                else task.status = "completed";
            }
        },
        deleteTask : (state, action : PayloadAction<string>)  => {
            state.items =  state.items.filter( t => t.id !== action.payload)
        }
        
    }, 
    extraReducers : (builder) => {
        builder
        .addCase(getTasks.pending, () => {})
    }
}) 

export const { addTask, toggleTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
