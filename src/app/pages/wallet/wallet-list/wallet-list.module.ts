import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { WalletListPage } from "./wallet-list";

import { EmptyListComponentModule } from "@/components/empty-list/empty-list.module";
import { PipesModule } from "@/pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";

import { DirectivesModule } from "@/directives/directives.module";

import { GenerateEntropyModal } from "@/app/modals/generate-entropy/generate-entropy";
import { GenerateEntropyModalModule } from "@/app/modals/generate-entropy/generate-entropy.module";
import { WalletBackupModal } from "@/app/modals/wallet-backup/wallet-backup";
import { WalletBackupModalModule } from "@/app/modals/wallet-backup/wallet-backup.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";

@NgModule({
	declarations: [WalletListPage],
	imports: [
		IonicModule,
		CommonModule,
		RouterModule.forChild([{ path: "", component: WalletListPage }]),
		TranslateModule,
		PipesModule,
		EmptyListComponentModule,
		ChartsModule,
		DirectivesModule,
		GenerateEntropyModalModule,
		WalletBackupModalModule,
	],
	entryComponents: [GenerateEntropyModal, WalletBackupModal],
})
export class WalletListPageModule {}
