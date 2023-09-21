import { sign } from 'jsonwebtoken';
import { merge } from 'lodash';
import QueryString from 'qs';
import { ChartType } from '../constants';

const user = {
	id: 1,
	email: 'dev@aquabyte.ai',
	canonicalEmail: 'dev@aquabyte.ai',
	name: 'Alice',
	accessibleClientTypes: ['INTERNAL_DASHBOARD', 'WHALE_SHARK', 'LALI', 'WATI', 'INTAKE'],
	isInternal: true,
	companyId: 1,
	role: 'ADMIN',
	laliRole: 'BERGEN_QA',
	latiRole: '',
	plaliRole: '',
	watiRole: 'ADMIN',
	intakeRole: 'ADMIN',
	phone: '+1 1111111111',
	phoneCountryCode: 'AS',
	imageUrl: null,
};

interface IVisit {
	siteId?: number;
	penIds?: number[];
	endDate?: string;
	startDate?: string;
	productCategory?: string;
	viewType?: string;
	analyticsState?: 'time' | 'bucket';
}

export const setAuthentication = () => {
	window.localStorage.setItem('jwt', '123123');
	window.localStorage.setItem('user', JSON.stringify(user));
};

export const visit = (query: IVisit) => {
	const defaultQuery: IVisit = {
		siteId: 8,
		penIds: [68],
		endDate: '2023-09-17',
		startDate: '2023-08-17',
		analyticsState: 'time',
	};

	const { productCategory, viewType, ...other } = query || {};

	const queryString = QueryString.stringify(merge(defaultQuery, other));

	const pathName = `/${productCategory || 'cameras'}/${viewType || 'chart'}`;
	cy.visit(`${pathName}?${queryString}`);
};

export function getDataTestId(componentName: string) {
	const dataTestId = `test-${componentName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`;
	return { dataTestId, extend: (value: string) => dataTestId + '_' + value };
}

export const beforeAll = () => {
	// login
	setAuthentication();

	cy.intercept('GET', '/api/**', { body: null }).as('API');
	cy.intercept('POST', '/messenger/web/ping*', { body: null }).as('intercom');

	cy.intercept('POST', '/api/v2/user/setting', {
		body: {
			id: 1,
			userId: 1,
			metadata: {},
		},
	}).as('getUserSetting');

	cy.intercept('POST', '**/login*', user).as('login');
	cy.intercept('POST', '/api/v2/logging', { body: null }).as('trackUserAccess');
	// cy.intercept('GET', '**/charts*', {}).as('chart');
	cy.intercept('GET', '/api/v1/getUserData', { fixture: 'userData.json' }).as('getUserData');
	cy.intercept('GET', '/api/v1/eventLogs/current', { fixture: 'currentEvent.json' }).as('getCurrentEvent');

	cy.fixture('chart.json').then((json) => {
		cy.intercept(
			'GET',
			`**/charts?chartType=${ChartType.FISH_ANALYZED_FOR_BIOMASS}*`,
			json[ChartType.FISH_ANALYZED_FOR_BIOMASS]
		).as(ChartType.FISH_ANALYZED_FOR_BIOMASS);

		cy.intercept('GET', `**/charts?chartType=${ChartType.DEPTH}*`, json[ChartType.DEPTH]).as(ChartType.DEPTH);
		cy.intercept('GET', `**/charts?chartType=${ChartType.FISH_DENSITY}*`, json[ChartType.FISH_DENSITY]).as(
			ChartType.FISH_DENSITY
		);

		cy.intercept('GET', `**/charts?chartType=${ChartType.LICE}*`, json[ChartType.LICE]).as(ChartType.LICE);

		cy.intercept('GET', `**/charts?chartType=${ChartType.AVERAGE_WEIGHT}*`, json[ChartType.AVERAGE_WEIGHT]).as(
			ChartType.AVERAGE_WEIGHT
		);

		cy.intercept('GET', `**/charts?chartType=${ChartType.WEIGHT_DIST}*`, json[ChartType.WEIGHT_DIST]).as(
			ChartType.WEIGHT_DIST
		);
	});
};
