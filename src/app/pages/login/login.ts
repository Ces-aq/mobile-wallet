import { PinCodeComponent } from "@/components/pin-code/pin-code";
import { AuthProvider } from "@/services/auth/auth";
import { UserDataProvider } from "@/services/user-data/user-data";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";

import { AuthController } from "@/app/auth/shared/auth.controller";
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
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		private authProvider: AuthProvider,
		private userDataProvider: UserDataProvider,
		private authController: AuthController,
	) {}

	ngOnInit() {
		this.authProvider.getMasterPassword().subscribe(master => {
			this.hasProfiles = master && !isNil(this.userDataProvider.profiles);
			this.isReady = true;
		});
	}

	async openProfileSignin() {
		this.authController.request().subscribe(x => console.log(x));
	}

	openProfileCreate() {
		this.pinCode.createUpdatePinCode("/profile/create");
	}
}
