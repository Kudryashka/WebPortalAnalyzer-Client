import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Setting } from './setting';
import { SettingsService } from './settings.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
	selector: 'setting-edit-modal',
	templateUrl: 'app/settings/settings-edit-modal.component.html'
})
export class SettingsEditModal implements OnInit {
	
	setting: Setting;

	constructor(private activeModal: NgbActiveModal,
		private settingsService: SettingsService) { }

	ngOnInit() {
		this.setting = this.settingsService.getEditedSetting();
	}

	save() {
		this.activeModal.close(this.setting);
	}
}

@Component({
	selector: 'settings',
	templateUrl: 'app/settings/settings.component.html'
})
export class SettingsComponent implements OnInit {

	localSettings: Setting[];
	globalSettings: Setting[];

	constructor(private settingService: SettingsService,
		private authenticationService: AuthenticationService,
		private modalService: NgbModal) {}

	ngOnInit() {
		this.authenticationService.checkAuthorization();
		this.loadLocalSettings();
		this.loadGlobalSettings();
	}

	loadLocalSettings() {
		this.settingService.getLocalSettings()
			.then(settings => this.localSettings = settings)
			.catch(this.handleError);
	}

	loadGlobalSettings() {
		this.settingService.getGlobalSettings()
			.then(settings => this.globalSettings = settings)
			.catch(this.handleError);
	}

	editSetting(setting: Setting) {
		this.settingService.putEditedSetting({
			name: setting.name,
			type: setting.type,
			label: setting.label,
			value: setting.value
		});
		this.modalService.open(SettingsEditModal, 
				{
					backdrop: 'static',
					keyboard: true,
					size: 'lg'
				})
			.result
				.then(
					res => {
						if (res) {
							this.settingService.updateSettingValue(res)
								.then(res => {
									//success
									console.log('Setting update success');
								})
								.catch(this.handleError);
						}
					}
				)
				.catch(err => {
					if (err == 1) return; //dismiss by 'Esc' or something like that
					this.handleError();
				});
	}

	private handleError() {
		console.log("Settings Error");
	}
}