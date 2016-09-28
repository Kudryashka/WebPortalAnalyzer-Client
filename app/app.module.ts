import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LinksCheckComponent } from './links-check/links-check.component';
import { LinksCheckDetailsComponent } from './links-check/links-check-details.component';

import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { OnlineHelpComponent } from './online-help/online-help.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersInfoComponent } from './users-info/users-info.component';


import { AuthenticationService } from './authentication/authentication.service';
import { SchedulerService } from './schedule/scheduler-service';
import { SearchService } from './search/search.service';
import { UsersInfoService } from './users-info/users-info.service';
import { LinksCheckService } from './links-check/links-check.service';
import { SettingsService } from './settings/settings.service';

import { routing } from './app.routing';

@NgModule({
	imports: [
	  	BrowserModule,
	  	CommonModule,
	  	FormsModule,
	  	HttpModule,
	  	AgmCoreModule.forRoot({
	  		apiKey: 'AIzaSyBo_WDq_6trNTX73M0hiUOnOvaVdbvXr5c',
	  		region: 'UA'
	  	}),
	  	routing
	],
	declarations: [
		AppComponent,
		AuthenticationComponent,
		DashboardComponent, 
		LinksCheckComponent,
		LinksCheckDetailsComponent,
		MobileAppsComponent,
		MonitoringComponent,
		OnlineHelpComponent,
		SearchComponent,
		SettingsComponent,
		UsersInfoComponent
	],
	providers: [
		AuthenticationService,
		SchedulerService,
		SearchService,
		UsersInfoService,
		LinksCheckService,
		SettingsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }