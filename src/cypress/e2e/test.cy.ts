import cypress from 'cypress';
import { getUserData } from '../support/utils';

describe('Example', () => {
	beforeEach(() => {
		cy.login('email', 'password');
		cy.visit('/cameras/overview');
	});
	it('Visit page', async () => {
		const userData = await getUserData();
	});
});
