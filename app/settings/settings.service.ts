import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Setting } from './setting';
import { SETTINGS_URL } from '../config/config';

@Injectable()
export class SettingsService {

	private localSettings: Setting[] = [
		{
			name: 'CHECK_LINKS_SERVICE_STATUS_UPDATE_INTERVAL',
			label: 'Інтервал оновлення статусу сервісу перевірки посилань (сек)',
			type: 'integer',
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
			.then(settings => (settings.json() as Setting[]).map(
					s => {
						if (s.name == 'PORTAL_DOMAIN_NAME') s.label = "Доменне ім'я порталу";
						else if (s.name == 'PORTAL_PORT_NUMBER') s.label = 'Порт порталу';
						else if (s.name == 'PORTAL_PROTOCOL_HTTP') s.label = 'Підтримка порталом протоколу HTTP';
						else if (s.name == 'PORTAL_PROTOCOL_HTTPS') s.label = 'Підтримка порталом протоколу HTTPS';
						else if (s.name == 'WEB_PORTAL_CHECK_META_KEY') s.label = 'Метатег використовуваний при зверненні до порталу';
						else if (s.name == 'WEB_PORTAL_CHECK_META_VALUE') s.label = 'Значення метатегу використовуваного при зверненні до порталу';
						else if (s.name == 'CHECK_LINK_START_LOCATIONS') s.label = 'Початкові сторінки для перевірки посилань';
						else if (s.name == 'CHECK_LINK_ON_LOAD_PAGE_BACKGOUND_JOB_TIMEOUT') s.label = 'Час очікування для відпрацювання JS на сторінці порталу';
						else if (s.name == 'CHECK_LINK_ACCEPTABLE_REDIRECT_DEPTH') s.label = 'Допустима глибина перенаправлень при перевірці посилань';
						else if (s.name == 'UNSUCCESSFULL_SEARCH_IS_CASE_SENSITIVE') s.label = 'Чутливість до регістру зареєстрованих пошукових запитів';

						return s;
					}
				))
			.catch(this.handleError)
	}

	updateSettingValue(setting: Setting) {
		let indexLocal = this.localSettings.map(s => s.name).indexOf(setting.name);
		if (indexLocal >= 0) {
			//local setting
			let localSetting = this.localSettings[indexLocal];
			localSetting.value = setting.value;
			return Promise.resolve(null);
		} else {
			//global setting
			let url = `${SETTINGS_URL}`;
			let headers: Headers = new Headers();
			headers.append('Content-Type', 'application/json');

			let params: Setting[] = [setting];
			return this.http.patch(url, JSON.stringify(params), 
				{headers: headers, withCredentials: true})
					.toPromise()
					.catch(this.handleError);
		}
	}

	private handleError(error: any) {
    	console.error('An error occurred', error);
    	return Promise.reject(error.message || error);
  	}

  	///////////////////////////////////
  	//Methods to edit setting via modal
  	///////////////////////////////////

  	private editedSetting : Setting;

  	putEditedSetting(setting: Setting) {
  		this.editedSetting = setting;
  	}

  	getEditedSetting() {
  		return this.editedSetting;
  	}
}