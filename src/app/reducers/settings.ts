import { ActionTypes } from "../actions/settings";
import { ActionModel } from "../models/action";
import { UserSettings } from "../models/settings";

const settings = new UserSettings();

export interface State {
	settings;
}

export function settingsReducer(state = settings, action: ActionModel) {
	const { type, payload } = action;
	switch (type) {
		case ActionTypes.SET: {
			state[payload.field] = payload.value;

			console.log("SET Action Dispatched >>>", { state, action });
			return state;
		}
		default:
			return state;
	}
}
