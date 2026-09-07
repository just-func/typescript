import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts'],
			// Set to what the suite already achieves, so a regression fails the build
			// instead of quietly lowering the number. Raise these, never lower them.
			thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
		},
	},
})
