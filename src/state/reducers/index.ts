import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";

const reducer = combineReducers({
  cells: cellsReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
