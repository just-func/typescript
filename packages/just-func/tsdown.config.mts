import { defineConfig } from 'tsdown'

export default defineConfig({
	// Unbundled, one output per source module, so the published paths stay exactly
	// what `tsc -p tsconfig.build.json` emitted into lib/.
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	format: 'esm',
	outDir: 'lib',
	unbundle: true,
	dts: true,
	sourcemap: true,
	// Pin the extensions so lib/ keeps plain .js/.d.ts paths; "type": "module" makes them ESM.
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	clean: true,
})
