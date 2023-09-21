import { ChartType } from '../constants';
import { visit } from '../support/utils';

describe('Chart', () => {
	it('should display LICE chart', () => {
		visit({
			siteId: 8,
			penIds: [-1],
			endDate: '2023-09-20',
			startDate: '2023-08-21',
			productCategory: 'lice',
			viewType: 'chart',
		});

		cy.wait('@LICE');

		cy.verifyCallCount('LICE', 1);

		cy.shouldVisibleChart({ name: ChartType.LICE, chartType: 'line' });
	});

	it('should display AVERAGE_WEIGHT chart', () => {
		visit({
			siteId: 8,
			penIds: [68],
			endDate: '2023-09-20',
			startDate: '2023-08-21',
			productCategory: 'biomass',
			viewType: 'chart',
			analyticsState: 'time',
		});

		cy.wait('@AVERAGE_WEIGHT');

		cy.verifyCallCount('AVERAGE_WEIGHT', 1);

		cy.shouldVisibleChart({ name: ChartType.AVERAGE_WEIGHT, chartType: 'line' });
	});

	it('should display WEIGHT_DIST chart', () => {
		visit({
			siteId: 8,
			penIds: [68],
			endDate: '2023-09-20',
			startDate: '2023-08-21',
			productCategory: 'biomass',
			viewType: 'chart',
			analyticsState: 'bucket',
		});

		cy.wait('@WEIGHT_DIST');

		cy.verifyCallCount('WEIGHT_DIST', 1);

		cy.shouldVisibleChart({ name: ChartType.WEIGHT_DIST, chartType: 'bar' });
	});
});
