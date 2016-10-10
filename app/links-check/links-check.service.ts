import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {
	REST_LINKS_CHECK_RUN_URL, 
	REST_LINKS_CHECK_STOP_URL, 
	REST_LINKS_CHECK_STATUS_URL,
	REST_LINKS_CHECK_GET_REPORT_URL,
	REST_LINKS_CHECK_GET_DETAILS_URL
} from '../config/config';

import { LinksCheckStatus } from './links-check-status';
import { LinksCheckReport, LinksCheckDetails } from './links-check-report';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class LinksCheckService {

	constructor(private http: Http, private authenticationService: AuthenticationService){}

	public getStatus() {
		return this.http.get(REST_LINKS_CHECK_STATUS_URL, 
			{withCredentials: true})
				.toPromise()
				.then(status => status.json() as LinksCheckStatus)
				.catch(this.handleError);
	}

	public executeRun() {
		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.put(REST_LINKS_CHECK_RUN_URL, '', {headers: headers, withCredentials: true}).subscribe();
	}

	public executeStop() {
		let headers: Headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.put(REST_LINKS_CHECK_STOP_URL, '', {headers: headers}).subscribe();
	}

	public getThirtyDaysReport() {
		return this.getReport(30);
	}

	public getLinksCheckDetails(checkID: number) {
		let url = `${REST_LINKS_CHECK_GET_DETAILS_URL}${checkID}`;
		return this.http.get(url, {withCredentials: true}).toPromise()
			.then(details => details.json() as LinksCheckDetails)
			.catch(this.handleError);
	}

	private getReport(days: number) {
		let url = `${REST_LINKS_CHECK_GET_REPORT_URL}${days}`;
		return this.http.get(url, {withCredentials: true}).toPromise()
			.then(report => report.json() as LinksCheckReport)
			.catch(this.handleError);
	}

	private handleError(error: any) {
    	console.error('An error occurred', error);
    	return Promise.reject(error.message || error);
  	}
}