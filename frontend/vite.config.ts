import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import macrosPlugin from "vite-plugin-babel-macros";

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
			},
		}),
		macrosPlugin(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
