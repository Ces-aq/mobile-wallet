import { PinCodeComponent } from "@/components/pin-code/pin-code";
import { AuthProvider } from "@/services/auth/auth";
import { UserDataProvider } from "@/services/user-data/user-data";
import { Component, OnInit, ViewChild } from "@angular/core";

import { isNil } from "lodash";

@Component({
	selector: "page-login",
	templateUrl: "login.html",
	styleUrls: ["login.scss"],
})
export class LoginPage implements OnInit {
	@ViewChild("pinCode", { read: PinCodeComponent, static: true })
	pinCode: PinCodeComponent;

	public hasProfiles = false;
	public isReady = false;

	constructor(
		private authProvider: AuthProvider,
		private userDataProvider: UserDataProvider,
	) {}

	ngOnInit() {
		this.authProvider.getMasterPassword().subscribe(master => {
			this.hasProfiles = master && !isNil(this.userDataProvider.profiles);
			this.isReady = true;
		});
	}

	openProfileSignin() {
		this.pinCode.createUpdatePinCode("/profile/signin");
	}

	openProfileCreate() {
		this.pinCode.createUpdatePinCode("/profile/create");
	}
}
