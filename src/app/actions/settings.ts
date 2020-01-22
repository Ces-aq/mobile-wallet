import { Action } from "@ngrx/store";

export enum ActionTypes {
	set = "SET",
}

export const SET = (field: string, value: string) => {
	return { type: ActionTypes.set, payload: { field, value } } as Action;
};
