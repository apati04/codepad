import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
    UpdateCellAction,
    DeleteCellAction,
    InsertCellAfterAction,
    MoveCellAction,
    DirectionTypes,
    Action,
} from '../actions';
import { CellTypes } from '../cell';
import bundle from '../../bundler';

export const updateCell = (id: string, content: string): UpdateCellAction => ({
    type: ActionType.UPDATE_CELL,
    payload: {
        id,
        content,
    },
});

export const deleteCell = (id: string): DeleteCellAction => ({
    type: ActionType.DELETE_CELL,
    payload: id,
});

export const moveCell = (
    id: string,
    direction: DirectionTypes
): MoveCellAction => ({
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
});

export const insertCellAfter = (
    id: string | null,
    cellType: CellTypes
): InsertCellAfterAction => ({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id,
        type: cellType,
    },
});
// create bundle
export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId,
            },
        });
        const result = await bundle(input);
        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId,
                bundle: result,
            },
        });
    };
};
