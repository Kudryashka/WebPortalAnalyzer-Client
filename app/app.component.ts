import {Component, OnInit, ViewContainerRef} from '@angular/core';

@Component({
	selector: 'client-app',
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css']})
export class AppComponent {
	title = 'WebPortalAnalyzer';
	description = 'Тонкий клієнт для аплікації';

	constructor(private viewContainerRef: ViewContainerRef) {}
}