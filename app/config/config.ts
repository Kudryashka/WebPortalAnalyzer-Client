export const SERVER_URL = 'http://xxx/';
export const REST_API_URL = `${SERVER_URL}api/`;
//Authorization
export const LOGIN_URL = `${REST_API_URL}login`;
//Links check
export const REST_LINKS_CHECK_RUN_URL =     	`${REST_API_URL}v1.1/linksCheck/run/`;
export const REST_LINKS_CHECK_STOP_URL = 		`${REST_API_URL}v1.1/linksCheck/stop/`;
export const REST_LINKS_CHECK_STATUS_URL = 		`${REST_API_URL}v1.1/linksCheck/status/`;
export const REST_LINKS_CHECK_GET_REPORT_URL = 	`${REST_API_URL}v1.1/linksCheck/report/`;
export const REST_LINKS_CHECK_GET_DETAILS_URL = `${REST_API_URL}v1.1/linksCheck/details/`;
//Search
export const REST_SEARCH_URL = `${REST_API_URL}v1.1/searchRequests/report/`;
//Users info
export const REST_USER_INFO_URL = `${REST_API_URL}v1.1/usersInfos/report/`;
//Settings
export const SETTINGS_URL = `${REST_API_URL}v1.1/settings`;