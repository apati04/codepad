import { Cell } from "../cell";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
    case ActionType.DELETE_CELL:
    case ActionType.MOVE_CELL:
    case ActionType.INSERT_CELL_BEFORE:
    default:
      return state;
  }
};

export default reducer;
