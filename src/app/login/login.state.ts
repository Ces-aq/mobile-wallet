import {
	Action,
	NgxsOnInit,
	State,
	StateContext,
	StateToken,
} from "@ngxs/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoginActions } from "./login.actions";
import { LoginConfig } from "./login.config";
import { LoginService } from "./login.service";
import { LoginStateModel } from "./login.type";

export const LOGIN_STATE_TOKEN = new StateToken<LoginStateModel>(
	LoginConfig.TOKEN,
);

@State<LoginStateModel>({
	name: LOGIN_STATE_TOKEN,
	defaults: {
		id: null,
	},
})
export class LoginState implements NgxsOnInit {
	constructor(private loginService: LoginService) {}

	public ngxsOnInit(ctx: StateContext<LoginStateModel>): void {
		this.loginService.isExpired().subscribe(isExpired => {
			if (isExpired) {
				// ctx.dispatch(new PinActions.Request());
			}
		});
	}

	@Action(LoginActions.Login)
	public login(
		ctx: StateContext<LoginStateModel>,
		action: LoginActions.Login,
	): Observable<void> {
		return this.loginService.login(action.id).pipe(
			tap(() => {
				ctx.setState({ id: action.id });
			}),
		);
	}

	@Action(LoginActions.Logout)
	public logout(ctx: StateContext<LoginStateModel>): Observable<void> {
		return this.loginService.logout().pipe(
			tap(() => {
				ctx.setState({ id: null });
			}),
		);
	}
}
