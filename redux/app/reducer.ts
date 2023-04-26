import { createSlice } from '@reduxjs/toolkit';
import { AppReducers } from 'redux/types';

const initState: AppReducers = {
    // only global params on datatable
    datatableSetting: {
        reload: 1,
        showTotal: (total: any, range: any) => {
            return ` يعرض ${range[0]} من ${total} قيود .`;
        },
        search: "",
    },
    pageDir: "ltr"
};

const appSlice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        reduxChangePageDiraction: (state, action) => {
            state.pageDir = action.payload
        },
        updateDatatableSetting: (state, action) => {
            state.datatableSetting = {
                ...state.datatableSetting,
                ...action.payload,
                reload: Math.random()
            }
        },
    }
})

export const { reduxChangePageDiraction, updateDatatableSetting } = appSlice.actions

export default appSlice.reducer;