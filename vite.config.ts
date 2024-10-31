import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@images': resolve(__dirname, 'src/assets/images'),
			'@assets': resolve(__dirname, 'src/assets')
		}
	}
})
