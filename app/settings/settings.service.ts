import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Setting} from './setting';
import {SETTINGS_URL} from '../config/config';

@Injectable()
export class SettingsService {

	private localSettings: Setting[] = [
		{
			name: 'CHECK_LINKS_SERVICE_STATUS_UPDATE_INTERVAL',
			label: 'Інтервал оновлення статусу сервісу перевірки посилань (сек)',
			value: '10'
		}
	];

	constructor(private http: Http) {}

	getLocalSettings() {
		return Promise.resolve(this.localSettings);
	}

	getLocalSettingByName(name: string) {
		let index = this.localSettings.map(s => s.name).indexOf(name);
		if (index >= 0) {
			return this.localSettings[index];
		}
		return null;
	}

	getGlobalSettings() {
		let url = `${SETTINGS_URL}`;
		return this.http.get(url, {withCredentials: true}).toPromise()
			.then(settings => settings.json() as Setting[])
			.catch(this.handleError)
	}

	private handleError(error: any) {
    	console.error('An error occurred', error);
    	return Promise.reject(error.message || error);
  	}
}