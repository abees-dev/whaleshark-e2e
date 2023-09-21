/* eslint-disable cypress/no-unnecessary-waiting */
import { ChartType } from '../constants';
import { visit } from '../support/utils';

describe('Camera Chart', () => {
	beforeEach(() => {
		visit({ startDate: '2023-09-11', endDate: '2023-09-17', productCategory: 'cameras', viewType: 'chart' });
	});

	it('should display FISH_DENSITY chart', () => {
		cy.wait('@FISH_DENSITY');
		cy.verifyCallCount('FISH_DENSITY', 1);

		cy.shouldVisibleChart({ name: ChartType.FISH_DENSITY, chartType: 'area' });
	});

	it('should display FISH_ANALYZED_FOR_BIOMASS chart', () => {
		cy.wait('@FISH_ANALYZED_FOR_BIOMASS');

		cy.verifyCallCount(ChartType.FISH_ANALYZED_FOR_BIOMASS, 1);

		cy.shouldVisibleChart({ name: ChartType.FISH_ANALYZED_FOR_BIOMASS, chartType: 'bar' });
	});

	it('should display DEPTH chart', () => {
		cy.wait('@DEPTH');

		cy.verifyCallCount('DEPTH', 1);

		cy.get('#DEPTH').scrollIntoView();

		cy.shouldVisibleChart({ name: ChartType.DEPTH, chartType: 'line' });
	});
});
