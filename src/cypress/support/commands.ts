Cypress.Commands.add('login', (email, password) => {
	cy.request('POST', 'https://data-api-2-auth-staging.aquabyte.ai/v1/auth/login', {
		email: email,
		password: password,
	}).then((res) => {
		window.localStorage.setItem('jwt', res.body.data.jwt);
		window.localStorage.setItem('user', JSON.stringify(res.body.data.user));
	});
});

Cypress.on('uncaught:exception', (e) => {
	return false;
});

Cypress.on('test:before:run:async', async (attributes, test) => {
	cy.intercept('/api/v1/getUserData').as('data');
});
