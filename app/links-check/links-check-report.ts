export class LinksCheckReport {
	summary: LinksCheckReportSummary;
	details: LinksCheckReportDetails[];
}

export class LinksCheckReportSummary {
	total: number;
	ok: number;
	error: number;
	unreachable: number;
	redirect: number;
}

export class LinksCheckReportDetails {
	id: number;
	start: string;
	end: string;
	ok: number;
	error: number;
	unreachable: number;
	redirect: number;
}

export class LinksCheckDetails {
	id: number;
	start: string;
	end: string;
	links: CheckedLink[];
}

export class CheckedLink {
	status: string;
	type: string;
	location: string;
	target: string;
	responseCode: number;
	redirectUrl: string;
}