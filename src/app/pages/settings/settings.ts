import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import {
	AlertController,
	ModalController,
	NavController,
	Platform,
} from "@ionic/angular";
import { Store } from "@ngrx/store";

import { Subject } from "rxjs";

import { TranslateService } from "@ngx-translate/core";

import { PinCodeComponent } from "@/components/pin-code/pin-code";
import { SettingsDataProvider } from "@/services/settings-data/settings-data";

import * as constants from "@/app/app.constants";
import * as fromRoot from "@/app/reducers/settings";

// Redux Actions
import { SET } from "@/app/actions/settings";

import { CustomNetworkCreateModal } from "@/app/modals/custom-network-create/custom-network-create";
import { PinCodeModal } from "@/app/modals/pin-code/pin-code";
import { UserDataProvider } from "@/services/user-data/user-data";
import { takeUntil, tap } from "rxjs/operators";

const packageJson = require("@@/package.json");

@Component({
	selector: "page-settings",
	templateUrl: "settings.html",
	styleUrls: ["settings.scss"],
	providers: [InAppBrowser],
})
export class SettingsPage implements OnInit, OnDestroy {
	@ViewChild("pinCode", { read: PinCodeComponent, static: true })
	pinCode: PinCodeComponent;

	public objectKeys = Object.keys;

	public availableOptions;
	public currentSettings;
	public onEnterPinCode;
	public appVersion: number = packageJson.version;

	public currentWallet;

	private unsubscriber$: Subject<void> = new Subject<void>();

	constructor(
		public platform: Platform,
		private navCtrl: NavController,
		private settingsDataProvider: SettingsDataProvider,
		private alertCtrl: AlertController,
		private translateService: TranslateService,
		private modalCtrl: ModalController,
		private inAppBrowser: InAppBrowser,
		private userDataProvider: UserDataProvider,
		public store: Store<fromRoot.State>,
	) {
		this.availableOptions = this.settingsDataProvider.AVALIABLE_OPTIONS;
		this.currentWallet = this.userDataProvider.currentWallet;
	}

	async openChangePinPage() {
		const modal = await this.modalCtrl.create({
			component: PinCodeModal,
			componentProps: {
				message: "PIN_CODE.DEFAULT_MESSAGE",
				outputPassword: true,
				validatePassword: true,
			},
		});

		await modal.present();
		modal.onDidDismiss().then(({ data }) => {
			if (data.password) {
				this.pinCode.createUpdatePinCode(null, data.password);
			}
		});
	}

	async openManageNetworksPage() {
		const modal = await this.modalCtrl.create({
			component: CustomNetworkCreateModal,
		});

		modal.present();
	}

	openPrivacyPolicy() {
		return this.inAppBrowser.create(
			constants.PRIVACY_POLICY_URL,
			"_system",
		);
	}

	confirmClearData() {
		this.translateService
			.get([
				"CANCEL",
				"CONFIRM",
				"ARE_YOU_SURE",
				"SETTINGS_PAGE.CLEAR_DATA_TEXT",
			])
			.subscribe(async translation => {
				const confirm = await this.alertCtrl.create({
					header: translation.ARE_YOU_SURE,
					message: translation["SETTINGS_PAGE.CLEAR_DATA_TEXT"],
					buttons: [
						{
							text: translation.CANCEL,
						},
						{
							text: translation.CONFIRM,
							handler: () => {
								this.onEnterPinCode = this.clearData;
								this.pinCode.open(
									"PIN_CODE.DEFAULT_MESSAGE",
									false,
								);
							},
						},
					],
				});

				confirm.present();
			});
	}

	private clearData() {
		this.settingsDataProvider.clearData();
		this.navCtrl.navigateRoot("/intro");
	}

	onSettingsChange(field: string, value: string) {
		this.store.dispatch(SET(field, value));
	}

	onUpdate() {
		this.settingsDataProvider.save(this.currentSettings);
	}

	ngOnInit() {
		this.settingsDataProvider.settings
			.pipe(
				takeUntil(this.unsubscriber$),
				tap(settings => (this.currentSettings = settings)),
			)
			.subscribe();

		this.settingsDataProvider.onUpdate$
			.pipe(
				takeUntil(this.unsubscriber$),
				tap(settings => (this.currentSettings = settings)),
			)
			.subscribe();
	}

	ngOnDestroy() {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
	}
}
