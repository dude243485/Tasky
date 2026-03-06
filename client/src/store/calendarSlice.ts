import { createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface CalendarState {
    selectedDate : string; 
}

const initialState : CalendarState = {
    selectedDate : new Date().toISOString(),
};

const calendarSlice = createSlice({
    name : 'calendar',
    initialState,
    reducers : {
        setSelectedDate : (state, action : PayloadAction<string>) => {
            state.selectedDate = action.payload;
        },
        setToday : (state) => {
            state.selectedDate = new Date().toISOString();
        }
    }
});

export const { setSelectedDate, setToday } = calendarSlice.actions;
export default calendarSlice.reducer;
