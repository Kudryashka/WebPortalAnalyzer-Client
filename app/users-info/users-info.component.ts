import {Component, OnInit} from '@angular/core';

import {UsersInfoReport, GeolocationSummary} from './users-info-report';
import {UsersInfoService} from './users-info.service';
import {AuthenticationService} from '../authentication/authentication.service';


@Component({
	selector: "users-info",
	templateUrl: "app/users-info/users-info.component.html",
	styles: [`
		.sebm-google-map-container {
  			height: 300px;
		}`]
})
export class UsersInfoComponent implements OnInit {

	report: UsersInfoReport;

	mapStartLatitude: number = 50.625061;
  	mapStartLongitude: number = 26.252353;

  	mapMarkers: MapMarker[] = [];

	constructor(private usersInfoService: UsersInfoService,
		private authenticationService: AuthenticationService) {}

	ngOnInit() {
		this.authenticationService.checkAuthorization();
		this.updateUsersInfoReport();
	}

	updateUsersInfoReport() {
		this.usersInfoService.getReport()
			.then(rep => this.onUsersInfoReportUpdate(rep))
			.catch(this.handleError);
	}

	private onUsersInfoReportUpdate(rep: UsersInfoReport) {
		this.report = rep;
		this.mapMarkers = [];
		let geolocations: GeolocationSummary[] = rep.geolocations;
		for (let location of geolocations) {
			if (location.latitude && location.longitude) {
				this.mapMarkers.push({
					label: String(location.requestsCount), 
					latitude: location.latitude, 
					longitude: location.longitude});
			}
		}
	}

	private handleError() {
		console.log("UsersInfoReportReceive Error");
	}
}

class MapMarker {
	label: string;
	latitude: number;
	longitude: number;
}
