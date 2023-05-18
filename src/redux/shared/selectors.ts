import { StoreState } from "../store/store";

export const selectErrorMessage = (state: StoreState)=>state.errors.errorMessage;