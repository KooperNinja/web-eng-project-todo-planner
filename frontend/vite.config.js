import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 *
 * @param {string} page
 * @returns
 */
const resolveInput = (page) => resolve(__dirname, 'src', page)

export default defineConfig({
	root: 'src',
	publicDir: '../public',
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolveInput('index.html'),
				dashboard: resolveInput('dashboard/index.html'),
				contact: resolveInput('contact/index.html'),
				login: resolveInput('login/index.html'),
				register: resolveInput('register/index.html'),
			},
		},
	},
})
