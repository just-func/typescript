import { defineConfig } from 'tsdown'

export default defineConfig({
	// Unbundled, one output per source module, so the published paths stay exactly
	// what `tsc -p tsconfig.build.json` emitted into lib/.
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	format: 'cjs',
	outDir: 'lib',
	unbundle: true,
	dts: true,
	sourcemap: true,
	// Without this tsdown emits .cjs/.d.cts, which would move every published path.
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	clean: true,
})
