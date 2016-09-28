import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from '../authentication/authentication.service';
import { LinksCheckService } from './links-check.service';

import { LinksCheckDetails } from './links-check-report';

@Component({
	selector: 'links-check-details',
	templateUrl: 'app/links-check/links-check-details.component.html'
})
export class LinksCheckDetailsComponent implements OnInit {

	details: LinksCheckDetails;

	constructor(private activatedRoute: ActivatedRoute, private linksCheckService: LinksCheckService,
		private authenticationService: AuthenticationService) { }

	ngOnInit() {
		this.authenticationService.checkAuthorization();

		this.activatedRoute.params.forEach((params: Params) => {
			let checkId: number = +params['id'];
			this.linksCheckService.getLinksCheckDetails(checkId)
				.then(details => this.details = details)
				.catch(error => console.log(error));
		});

	}
}