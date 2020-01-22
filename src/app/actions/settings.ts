import { Action } from "@ngrx/store";

export enum ActionTypes {
	SET = "SET",
}

export const SET = (field: string, value: string) => {
	return { type: ActionTypes.SET, payload: { field, value } } as Action;
};
