// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { beforeAll } from './utils';
import './commands';

beforeEach(function () {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000);
  beforeAll();
});
