// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@components': 'src/lib/components',
			'@stores': 'src/lib/stores',
			'@lib': 'src/lib',
		}
	}
};

export default config;
