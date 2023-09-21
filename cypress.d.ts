declare namespace Cypress {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Chainable<Subject> {
		login(): void;

		verifyCallCount(alias: string, expectedNumberOfCalls: number): void;

		shouldVisibleChart({ chartType, name }: { chartType: 'area' | 'bar' | 'line'; name: string }): void;
	}
}
