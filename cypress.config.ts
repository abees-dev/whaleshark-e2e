import { defineConfig } from 'cypress';
// import { initPlugin } from 'cypress-plugin-snapshots/plugin';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// initPlugin(on, config);
		},
		baseUrl: 'https://staging.aquabyte.ai/dashboard',
		video: false,
		waitForAnimations: true,
		viewportWidth: 1920,
		viewportHeight: 1080,
		excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
		env: {
			'cypress-plugin-snapshots': {
				autopassNewSnapshots: true,
				autoCleanUp: false,
				diffLines: 3,
				excludeFields: [],
				ignoreExtraArrayItems: false,
				ignoreExtraFields: false,
				normalizeJson: true,
				prettier: true,
				imageConfig: {
					createDiffImage: true,
					resizeDevicePixelRatio: true,
					threshold: 0.01,
					thresholdType: 'percent',
				},
				updateSnapshots: false,
			},
		},
	},
});
