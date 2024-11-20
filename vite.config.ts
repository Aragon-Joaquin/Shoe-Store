import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	},
	resolve: {
		alias: {
			'@images': resolve(__dirname, 'src/assets/images'),
			'@assets': resolve(__dirname, 'src/assets')
		}
	}
})
