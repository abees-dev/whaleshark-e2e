Cypress.Commands.add('login', () => {
	cy.request('POST', 'api/v1/login', {
		email: 'dev@aquabyte.ai',
		password: 'Aquabyte2023!',
	}).then((res) => {
		window.localStorage.setItem('jwt', res.body.jwt);
		window.localStorage.setItem('user', JSON.stringify(res.body.user));
	});
});

Cypress.on('uncaught:exception', (e) => {
	return false;
});

Cypress.Commands.add(`verifyCallCount`, (alias, expectedNumberOfCalls) => {
	cy.get(`@${alias}.all`).then((calls) => {
		cy.wrap(calls.length).should(`equal`, expectedNumberOfCalls);
	});
});

Cypress.Commands.add('shouldVisibleChart', ({ chartType, name }) => {
	cy.get(`#${name}`)
		.should('be.visible')
		.find('.recharts-cartesian-axis-ticks')
		.should('be.visible', 'should yAxis ticks visible');

	cy.get(`#${name}`)
		.find(`.recharts-layer.recharts-${chartType}`)
		.should('be.visible', 'should render chart area')
		.find('path')
		.should('be.visible');
});
