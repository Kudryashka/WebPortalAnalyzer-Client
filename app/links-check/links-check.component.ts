import { Component, OnInit, OnDestroy } from '@angular/core';

import { RuleType } from '../schedule/rule-type';
import { RULE_TYPES } from '../schedule/rule-types';
import { DayOfWeek } from '../schedule/day-of-week';
import { DAYS_OF_WEEK } from '../schedule/days-of-week';
import { Rule } from '../schedule/rule';
import { SchedulerService } from '../schedule/scheduler-service';
import { LinksCheckStatus } from './links-check-status';
import { LinksCheckService } from './links-check.service';
import { LinksCheckReport } from './links-check-report';
import { AuthenticationService } from '../authentication/authentication.service';
import { SettingsService } from '../settings/settings.service';

@Component({
	selector: 'links-check',
	templateUrl: 'app/links-check/links-check.component.html'
})
export class LinksCheckComponent implements OnInit, OnDestroy {

	currentServiceStatus: string = "Невідомий";

	ruleTypes: RuleType[];
	daysOfWeek: DayOfWeek[];

	newRule: Rule;

	registeredRules: Rule[];

	//Empty report
	report: LinksCheckReport = {
		summary: {
			total: 0,
			ok: 0,
			error: 0,
			unreachable: 0,
			redirect: 0
		},
		details: []
	}

	//Timeouts
	updateServiceStatusInterval: any;

	constructor(private schedulerService: SchedulerService, 
		private linksCheckService: LinksCheckService, 
		private authenticationService: AuthenticationService,
		private settingsService: SettingsService) {}

	ngOnInit() {
		this.authenticationService.checkAuthorization();

		this.ruleTypes = RULE_TYPES;
		this.daysOfWeek = DAYS_OF_WEEK;

		this.newRule = {
			type: this.ruleTypes[0],
			dayOfWeek: this.daysOfWeek[0],
			hours: undefined,
			minutes: undefined,
			active: undefined
		}

		this.updateServiceStatus();
		this.updateScheduledRules();
		this.updateReport();

		//Start autoupdates
		let updateServiceIntervalSec = Number(this.settingsService
			.getLocalSettingByName('CHECK_LINKS_SERVICE_STATUS_UPDATE_INTERVAL').value);
		if (updateServiceIntervalSec) {
			this.updateServiceStatusInterval = setInterval(
				() => {this.updateServiceStatus()}, 1000 * updateServiceIntervalSec);
		}
	}

	ngOnDestroy() {
		//Stop autoupdates
		clearInterval(this.updateServiceStatusInterval);
	}

	updateServiceStatus() {
		this.linksCheckService.getStatus()
			.then(status => this.currentServiceStatus = status.status)
			.catch(error => {
				this.currentServiceStatus = 'Невідомий';
				console.log(error)});
	}

	updateScheduledRules() {
		this.schedulerService.getScheduledPortalCheckRules().then(rules => this.registeredRules = rules);
	}

	callCheckManually() {
		console.log("call check manually");
		this.linksCheckService.executeRun();
	}

	disableCurrentActiveCheck() {
		console.log("disable current active check");
		this.linksCheckService.executeStop();
	}

	humanReadableRule(rule: Rule): string {
		if (rule.type.id === 0) {
			return rule.type.name + " (" + rule.hours + ":" + rule.minutes + ")";
		}
		if (rule.type.id === 1) {
			return rule.type.name + " (" + rule.dayOfWeek.name + " " +  rule.hours + ":" + rule.minutes + ")";
		}
		return String(rule);
	}

	removeRule(rule: Rule) {
		console.log(this.humanReadableRule(rule));
	}

	submitNewRule() {
		console.log("Type: " + this.newRule.type.id + ":" + this.newRule.type.name);
		console.log("Day of week: " + this.newRule.dayOfWeek.id + ":" + this.newRule.dayOfWeek.name);
		console.log("Time: " + this.newRule.hours + ":" + this.newRule.minutes);
	}

	updateReport() {
		this.linksCheckService.getThirtyDaysReport()
			.then(report => this.report = report)
			.catch(error => console.log(error));
	}
}
