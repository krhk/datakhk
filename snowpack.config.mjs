/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' },
	},
	devOptions: {
		open: "none"
	},
	optimize: {
		bundle: true,
		minify: true,
		manifest: true,
		target: 'es2018',
	}
};
