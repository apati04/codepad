import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundleReducer from "./bundlesReducer";

const reducer = combineReducers({
    cells: cellsReducer,
    bundles: bundleReducer,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
