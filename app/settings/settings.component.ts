import {Component, OnInit} from '@angular/core';

import {Setting} from './setting';
import {SettingsService} from './settings.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
	selector: 'settings',
	templateUrl: 'app/settings/settings.component.html'
})
export class SettingsComponent implements OnInit {

	localSettings: Setting[];
	globalSettings: Setting[];

	constructor(private settingService: SettingsService,
		private authenticationService: AuthenticationService) {}

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

	private handleError() {
		console.log("Settings Error");
	}
}