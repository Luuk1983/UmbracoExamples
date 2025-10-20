import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/bundle.manifests.ts",
			formats: ["es"],
		},
		outDir: "../wwwroot/App_Plugins/ExampleDeleteButton",
		emptyOutDir: true,
		sourcemap: true,
		rollupOptions: {
			external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
		}
	}
});