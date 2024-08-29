module.exports = {
	module: {
		rules: [
			{
				test: /\.wasm$/,
				type: "webassembly/async"
			}
		]
	},
	experiments: {
		asyncWebAssembly: true
	}
};
